import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  createNewConsultation,
  createNewPatient,
} from "../../features/Registration/services/api";
import PatientRegistrationForm from "../../features/Registration/components/PatientRegistrationForm";
import { addNewBilling } from "../../features/Billing/services/billingApi";
import { MainHeading } from "../../components/ui";
const Registration = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "United Arab Emirates",
      source: "walk-in",
      gender: "female",
      emirate: "Dubai",
      allergies: "No Allergies",
      countryCode: {
        label: "+971",
        value: "+971",
      },
    },
  });

  const location = useLocation();
  const patientData = location.state || {};

  const [preview, setPreview] = useState(null);

  const mutation = useMutation({
    mutationFn: createNewPatient,
    onSuccess: (data, variables) => {
      toast.success("The patient has been successfully registered");

      // If "startConsultation" is true, start a new consultation
      if (variables.startConsultation) {
        const consultData = {
          appointmentId: data?.patient?.appointmentId || 0,
          patientId: data?.patient?.id,
          doctorId: data?.patient?.doctorId,
        };
        newConsultMutation.mutate(consultData);
      } else {
        // reset();
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
console.log(patientData)
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
      window.scrollTo(0, 0);
      reset();
      toast.success("New Billing has been successfully created");
    },
    onError: (error) => {
      window.scrollTo(0, 0);
      toast.error("Error with creating billing.");
    },
  });

  useEffect(() => {
    setValue("appointmentId", patientData.appointmentId || 0);
    setValue("firstName", patientData.firstName || "");
    setValue("lastName", patientData.lastName || "");
    setValue("email", patientData.email || "");
    setValue(
      "countryCode",
      Object.keys(patientData).includes("countryCode")
        ? { label: patientData?.countryCode, value: patientData?.countryCode }
        : {
            label: "+971",
            value: "+971",
          }
    );
    setValue(
      "phoneNumber",
      patientData.phoneNumber
        ? `${patientData?.phoneNumber.slice(
            0,
            2
          )}-${patientData?.phoneNumber.slice(
            2,
            5
          )}-${patientData?.phoneNumber.slice(5)}`
        : ""
    );
  }, [setValue, patientData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data, startConsultation = false) => {
    const formData = new FormData();

    const updatedData = {
      ...data,
      countryCode: data.countryCode.value,
      doctorId: Number(data?.doctorId),
      appointmentId: Number(data.appointmentId) || 0,
    };
    console.log(updatedData);
    for (const [key, value] of Object.entries(updatedData)) {
      formData.append(key, value);
    }

    if (
      updatedData?.profilePicture?.length > 0 &&
      updatedData.profilePicture[0]
    ) {
      formData.append("profilePicture", updatedData.profilePicture[0]);
    }

    mutation.mutate({ formData, startConsultation });
  };

  return (
    <>
      <div className="mx-2 lg:mx-5 mt-2 lg:mt-5 p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg">
        <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
          <MainHeading title={"Register New Patient"} />
        </div>
        <PatientRegistrationForm
          register={register}
          errors={errors}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          preview={preview}
          handleImageChange={handleImageChange}
          isLoading={mutation.isPending || newConsultMutation.isPending}
        />
      </div>
    </>
  );
};

export default Registration;
