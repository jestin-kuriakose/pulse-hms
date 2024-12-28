import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNewConsultation } from "../../Registration/services/api";
import { addNewBilling } from "../../Billing/services/billingApi";
import { SelectInput, Button, CustomModal } from "../../../components/ui";
import { fetchEmployees } from "../../Employees/employeeSlice";

const StartConsultationModal = ({ open, setOpen, selectedPatient }) => {
  const [doctorId, setDoctorId] = useState(null);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  const {
    list: employeeList,
    schedule: availability,
    status: availabilityLoadingStatus,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const doctorsList = useMemo(
    () => employeeList?.filter((emp) => emp?.position === "DOCTOR"),
    [employeeList]
  );

  const newConsultMutation = useMutation({
    mutationFn: createNewConsultation,
    onSuccess: (data) => {
      toast.success("New Consultation has been successfully created");
      const billingData = {
        consultationId: data?.consultation?.id,
      };
      newBillingMutation.mutate(billingData);
    },
    onError: (error) => {
      window.scrollTo(0, 0);
      toast.error("Error with registering consultation.");
    },
  });

  const newBillingMutation = useMutation({
    mutationFn: addNewBilling,
    onSuccess: () => {
      toast.success("New Billing has been successfully created");
      setOpen(false);
    },
    onError: (error) => {
      window.scrollTo(0, 0);
      toast.error("Error with creating billing.");
    },
  });

  const handleStartConsultation = async () => {
    if (!doctorId) {
      setErrors({ doctorId: { message: "Doctor is required" } });
      return;
    }
    const consultData = {
      appointmentId: 0,
      patientId: selectedPatient?.id,
      doctorId: doctorId,
    };

    newConsultMutation.mutate(consultData);
  };

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="New Consultation"
    >
      <h2 className="text-2xl font-bold mb-4">Start New Consultation</h2>
      <div className="space-y-4">
        <SelectInput
          label="Doctor"
          name="doctorId"
          options={doctorsList.map((doctor) => ({
            value: doctor.id,
            label: `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`,
          }))}
          value={doctorId}
          onChange={(data) => setDoctorId(data.value)}
          required={{ required: "Doctor is required" }}
          errors={errors}
        />

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

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleStartConsultation}>
            Start Consultation
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default StartConsultationModal;
