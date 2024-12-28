import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import {
  generateTimeSlots,
  checkUnavailableSlots,
} from "../../utils/timeSlots";
import SelectInput from "../../../../components/ui/Select/SelectInput";
import TextInput from "../../../../components/ui/Inputs/TextInput";
import PhoneNumberInput from "../../../../components/ui/Inputs/PhoneNumberInput";
import TextArea from "../../../../components/ui/Inputs/TextArea";
import PatientSearch from "../PatientSearch/PatientSearch";
import { createAppointment, getAppointments } from "../../appointmentsSlice";
import { fetchEmployeeSchedule } from "../../../Employees/employeeSlice";
import moment from "moment";
import TimeSlotSelector from "../common/TimeSlotSelector";
import AppointmentCalendar from "../common/AppointmentCalendar";
import { Button } from "../../../../components/ui";

const NewAppointmentModal = ({ open, setOpen }) => {
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
      patientId: null,
      firstName: "",
      lastName: "",
      email: "",
      countryCode: { label: "+971", value: "+971" },
      phoneNumber: "",
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
        patientId: data.patientType === "existing" ? Number(data.patientId) : 0,
        countryCode:
          data.patientType === "existing"
            ? data.countryCode
            : data.countryCode.value,
        date: dayjs(data.date).toISOString(),
      };

      dispatch(createAppointment(appointmentData));
      reset();
      setOpen(false);
    },
    [dispatch, reset, setOpen]
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
            <div className="mt-4 mb-2 p-4 bg-white dark:bg-gray-500 text-gray-900 dark:text-gray-100 rounded-lg dark:shadow">
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

        <div className="mb-4">
          <div className="flex border-b">
            <button
              className={`py-2 px-4 font-semibold ${
                patientType === "existing"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setValue("patientType", "existing")}
              type="button"
            >
              Existing Patient
            </button>
            <button
              className={`py-2 px-4 font-semibold ${
                patientType === "new"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setValue("patientType", "new")}
              type="button"
            >
              New Patient
            </button>
          </div>
        </div>

        {patientType === "existing" ? (
          <Controller
            name="patientId"
            control={control}
            rules={{ required: "Patient is required" }}
            errors={errors}
            render={({ field }) => (
              <PatientSearch
                onSelectPatient={(patient) => {
                  field.onChange(patient.id);
                  handlePatientSelect(patient);
                }}
                required={{ required: "Patient is required" }}
                errors={errors}
              />
            )}
          />
        ) : (
          <>
            <TextInput
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              required={{ required: "First name is required" }}
            />
            <TextInput
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
              required={{ required: "Last name is required" }}
            />
            <PhoneNumberInput
              label="Phone Number"
              name="phoneNumber"
              control={control}
              errors={errors}
              required={{ required: "Phone number is required" }}
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              register={register}
              errors={errors}
              required={{ required: "Email is required" }}
            />
          </>
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
          <Button type="submit" isLoading={appointmentsStatus === "loading"}>
            Save
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewAppointmentModal;
