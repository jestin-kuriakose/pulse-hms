import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNewConsultation } from "../../Registration/services/api";
import { addNewBilling } from "../../Billing/services/billingApi";
import { SelectInput, Button, CustomModal } from "../../../components/ui";
import { fetchEmployees } from "../../Employees/employeeSlice";
import { set } from "react-hook-form";
import { fetchPatientConsultations } from "../../Consultations/consultationSlice";

const StartBillingModal = ({ open, setOpen, selectedPatient }) => {
  const [consultId, setConsultId] = useState(null);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  const {
    consultationList,
    status
  } = useSelector((state) => state.consultations);

  useEffect(() => {
    if (selectedPatient) {
      dispatch(fetchPatientConsultations(selectedPatient.id));
    }
  }, [dispatch, selectedPatient]);

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

  const handleStartBilling = async () => {
    if (!consultId) {
      setErrors({ consultationId: { message: "Consultation is required" } });
      return;
    }
    const consultData = {
      consultationId: consultId,
    };

    newBillingMutation.mutate(consultData);
  };

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="New Consultation"
    >
      <h2 className="text-2xl font-bold mb-4">Start New Billing</h2>
      <div className="space-y-4">
        <SelectInput
          label="Consultation"
          name="consultationId"
          options={consultationList.map((consultation) => ({
            value: consultation.id,
            label: `Consultation #${consultation.id} - ${new Date(
              consultation.created_at
            )}`,
          }))}
          value={consultId}
          onChange={(data) => setConsultId(data.value)}
          required={{ required: "Consultation is required" }}
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
          <Button type="button" onClick={handleStartBilling}>
            Start Billing
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default StartBillingModal;
