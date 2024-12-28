import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  generateTimeSlots,
  checkUnavailableSlots,
} from "../../Appointments/utils/timeSlots";
import {
  createAppointment,
  getAppointments,
} from "../../Appointments/appointmentsSlice";
import moment from "moment";
import { Button, TextArea, SelectInput, CustomModal } from "../../../components/ui";
import AppointmentCalendar from "../../Appointments/components/common/AppointmentCalendar";
import TimeSlotSelector from "../../Appointments/components/common/TimeSlotSelector";
import { fetchEmployeeSchedule } from "../../Employees/employeeSlice";

const StartAppointmentModal = ({ open, setOpen, selectedPatient }) => {
  const dispatch = useDispatch();
  const {
    list: employeeList,
    schedule: availability,
    status: availabilityLoadingStatus,
  } = useSelector((state) => state.employees);
  const { appointments: appointmentsData, status: appointmentsStatus } =
    useSelector((state) => state.appointments);
  console.log(appointmentsData);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctorId: "",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      patientType: "existing",
      patientId: selectedPatient?.id,
      firstName: selectedPatient?.firstName,
      lastName: selectedPatient?.lastName,
      email: selectedPatient?.email,
      countryCode: {
        label: selectedPatient?.countryCode,
        value: selectedPatient?.countryCode,
      },
      phoneNumber: selectedPatient?.phoneNumber,
      notes: "",
    },
  });

  const selectedDoctor = watch("doctorId");
  const selectedDate = watch("date");
  const patientType = watch("patientType");

  const doctorsList = useMemo(
    () => employeeList?.filter((emp) => emp?.position === "DOCTOR"),
    [employeeList]
  );

  const fetchDoctorSchedule = useCallback(() => {
    if (selectedDoctor) {
      const startDate = dayjs(selectedDate)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = dayjs(selectedDate).endOf("month").format("YYYY-MM-DD");
      dispatch(
        fetchEmployeeSchedule({ id: selectedDoctor, startDate, endDate })
      );
      dispatch(
        getAppointments({ dateRange: { startDate, endDate }, search: "" })
      );
    }
  }, [dispatch, selectedDoctor, selectedDate]);

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
      if (!data.date || !data.startTime || !data.endTime) {
        toast.error("Select a Date and time slot to save this appointment.");
        return;
      }

      const appointmentData = {
        ...data,
        doctorId: Number(data.doctorId),
        patientId: Number(selectedPatient.id),
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        email: selectedPatient.email,
        countryCode: selectedPatient.countryCode,
        phoneNumber: selectedPatient.phoneNumber,
        date: dayjs(data.date).toISOString(),
      };

      dispatch(createAppointment(appointmentData));
      reset();
      setOpen(false);
    },
    [dispatch, reset, setOpen, selectedPatient]
  );

  const handlePatientSelect = useCallback(
    (patient) => {
      setValue("patientId", patient.id);
      setValue("firstName", patient.firstName);
      setValue("lastName", patient.lastName);
      setValue("email", patient.email);
      setValue("countryCode", patient.countryCode);
      setValue("phoneNumber", patient.phoneNumber);
    },
    [setValue]
  );

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="New Appointment"
    >
      <h2 className="text-2xl font-bold mb-4">Schedule New Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectInput
          label="Doctor"
          name="doctorId"
          options={doctorsList.map((doctor) => ({
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
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <AppointmentCalendar
                availability={availability}
                selectedDate={dayjs(field.value)}
                onSelectDate={(date) =>
                  field.onChange(date.format("YYYY-MM-DD"))
                }
                currentAppointment={null}
              />
            )}
          />
        )}

        {selectedDoctor && timeSlots.length > 0 && (
          <>
            <div className="mt-4 mb-2 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Appointment Details
              </h3>
              <p>{dayjs(selectedDate).format("MMMM D, YYYY")}</p>
              <p>
                {watch("startTime") && watch("endTime")
                  ? `${moment(watch("startTime"), "HH:mm").format(
                      "h:mm A"
                    )} - ${moment(watch("endTime"), "HH:mm").format("h:mm A")}`
                  : "No time slot selected"}
              </p>
            </div>

            <TimeSlotSelector
              timeSlots={timeSlots}
              selectedSlot={{
                start: watch("startTime"),
                end: watch("endTime"),
              }}
              unavailableSlots={unavailableSlots}
              handleSlotClick={handleSlotClick}
            />
          </>
        )}

        {selectedPatient && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-300">
              Patient:
            </h3>
            <p className="text-gray-900 dark:text-gray-300">
              {selectedPatient.firstName} {selectedPatient.lastName} (
              {selectedPatient.mrNumber})
            </p>
            <p className="text-gray-900 dark:text-gray-400 text-sm mt-1">
              {selectedPatient.email} | {selectedPatient.phoneNumber}
            </p>
          </div>
        )}

        <TextArea
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
        />

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={status === "loading"}>
            Save
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default StartAppointmentModal;
