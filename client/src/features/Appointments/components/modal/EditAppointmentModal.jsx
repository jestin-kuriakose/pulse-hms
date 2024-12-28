import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editAppointment } from "../../appointmentsSlice";
import {
  fetchEmployees,
  fetchEmployeeSchedule,
} from "../../../Employees/employeeSlice";
import {
  generateTimeSlots,
  checkUnavailableSlots,
} from "../../utils/timeSlots";
import TimeSlotSelector from "../common/TimeSlotSelector";
import AppointmentCalendar from "../common/AppointmentCalendar";
import moment from "moment";
import SelectInput from "../../../../components/ui/Select/SelectInput";
import { Button, TextArea } from "../../../../components/ui";

const EditAppointmentModal = ({
  openViewAppointmentModal,
  setOpenViewAppointmentModal,
}) => {
  const dispatch = useDispatch();
  const currentAppointment = useSelector(
    (state) => state.appointments.currentAppointment
  );
  const {
    doctorList,
    schedule: availability,
    status: employeeScheduleStatus,
  } = useSelector((state) => state.employees);
  const { appointments: appointmentsData, status: appointmentsStatus } =
    useSelector((state) => state.appointments);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctorId: currentAppointment?.doctor?.id,
      notes: currentAppointment?.notes,
      date: dayjs(currentAppointment?.date).format("YYYY-MM-DD"),
      startTime: currentAppointment?.startTime,
      endTime: currentAppointment?.endTime,
    },
  });

  const selectedDoctor = watch("doctorId");
  const selectedDate = watch("date");

  const fetchDoctorSchedule = useCallback(() => {
    if (selectedDoctor) {
      const startDate = dayjs(selectedDate)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = dayjs(selectedDate).endOf("month").format("YYYY-MM-DD");
      dispatch(
        fetchEmployeeSchedule({ id: selectedDoctor, startDate, endDate })
      );
    }
  }, [dispatch, selectedDoctor, selectedDate]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    fetchDoctorSchedule();
  }, [fetchDoctorSchedule]);

  const timeSlots = useMemo(() => {
    if (selectedDoctor && availability) {
      const selectedDateAvailability = availability.find((avail) =>
        dayjs(avail.startTime).isSame(selectedDate, "day")
      );

      if (selectedDateAvailability) {
        return generateTimeSlots(
          selectedDateAvailability.startTime,
          selectedDateAvailability.endTime,
          30
        );
      }
    }
    return [];
  }, [selectedDoctor, availability, selectedDate]);

  const unavailableSlots = useMemo(() => {
    return new Set(
      checkUnavailableSlots(appointmentsData, timeSlots, selectedDate)
    );
  }, [appointmentsData, timeSlots, selectedDate]);

  const handleSlotClick = useCallback(
    (slot) => {
      setValue("startTime", slot.start);
      setValue("endTime", slot.end);
    },
    [setValue]
  );

  const onSubmit = useCallback(
    (data) => {
      const updatedAppointment = {
        ...data,
        patientId: currentAppointment.patientId,
      };
      dispatch(
        editAppointment({
          id: currentAppointment.id,
          appointmentData: updatedAppointment,
        })
      );
      reset()
      setOpenViewAppointmentModal(false);
    },
    [dispatch, currentAppointment, setOpenViewAppointmentModal]
  );

  return (
    <CustomModal
      isOpen={openViewAppointmentModal}
      onRequestClose={() => setOpenViewAppointmentModal(false)}
      contentLabel="Edit Appointment"
    >
      <h2 className="text-2xl font-bold mb-4">Modify Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectInput
          label="Doctor"
          name="doctorId"
          options={doctorList?.map((doctor) => ({
            value: doctor.id,
            label: `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`,
          }))}
          control={control}
          required={{ required: "Doctor is required" }}
          errors={errors}
        />

        {selectedDoctor && (
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <AppointmentCalendar
                availability={availability}
                selectedDate={dayjs(field.value)}
                onSelectDate={(date) =>
                  field.onChange(date.format("YYYY-MM-DD"))
                }
                currentAppointment={currentAppointment}
              />
            )}
          />
        )}

        {selectedDoctor && (
          <div className="mt-4 mb-2 p-4 bg-white dark:bg-gray-500 text-gray-900 dark:text-gray-100 rounded-lg dark:shadow">
            <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
            <div>
              <p className="font-normal">Current Appointment:</p>
              <p>{moment(currentAppointment.date).format("MMMM D, YYYY")}</p>
              <p>{`${moment(currentAppointment.startTime, "HH:mm").format(
                "h:mm A"
              )} - ${moment(currentAppointment.endTime, "HH:mm").format(
                "h:mm A"
              )}`}</p>
            </div>
            {(selectedDate &&
              !moment(selectedDate).isSame(
                moment(currentAppointment.date),
                "day"
              )) ||
            watch("startTime") !== currentAppointment.startTime ||
            watch("endTime") !== currentAppointment.endTime ? (
              <div className="mt-2">
                <p className="font-normal">New Appointment:</p>
                <p>{moment(selectedDate).format("MMMM D, YYYY")}</p>
                <p>
                  {watch("startTime") && watch("endTime")
                    ? `${moment(watch("startTime"), "HH:mm").format(
                        "h:mm A"
                      )} - ${moment(watch("endTime"), "HH:mm").format(
                        "h:mm A"
                      )}`
                    : "No time slot selected"}
                </p>
              </div>
            ) : null}
          </div>
        )}

        {selectedDoctor && timeSlots.length > 0 && (
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedSlot={{
              start: watch("startTime"),
              end: watch("endTime"),
            }}
            unavailableSlots={unavailableSlots}
            handleSlotClick={handleSlotClick}
            currentAppointmentSlot={{
              start: currentAppointment.startTime,
              end: currentAppointment.endTime,
            }}
          />
        )}

        <TextArea
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          required={false}
        />

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="medium"
            type="button"
            onClick={() => setOpenViewAppointmentModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="medium"
            type="submit"
            isLoading={appointmentsStatus === "loading"}
          >
            Save
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default EditAppointmentModal;
