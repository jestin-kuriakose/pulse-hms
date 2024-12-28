import React, { useMemo } from "react";
import { sources, genders, emirates, countries } from "../data/constants";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import ImageUpload from "../../../components/ui/Inputs/ImageUpload";
import {
  Button,
  LoadingScreen,
  PhoneNumberInput,
  TextInput,
  SelectInput,
} from "../../../components/ui";

const PatientRegistrationForm = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
  preview,
  handleImageChange,
  isLoading,
}) => {
  const {
    list: employeeList,
    schedule: availability,
    status: availabilityLoadingStatus,
  } = useSelector((state) => state.employees);

  const doctorsList = useMemo(
    () => employeeList?.filter((emp) => emp?.position === "DOCTOR"),
    [employeeList]
  );

  if (isLoading) {
    return <LoadingScreen message="Registering patient..." />;
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="appointment-form max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <TextInput
            label="Middle Name"
            name="middleName"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Gender"
            name="gender"
            control={control}
            errors={errors}
            options={genders?.map((opt) => ({ label: opt, value: opt }))}
            required={{ required: "Gender is required" }}
          />
          <TextInput
            label="Marital Status"
            name="maritalStatus"
            register={register}
            errors={errors}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Contact Information
          </h3>
          <TextInput
            label="Email"
            name="email"
            register={register}
            errors={errors}
            required={{ required: "Email is required" }}
          />
          <PhoneNumberInput
            label="Phone Number"
            name="phoneNumber"
            control={control}
            errors={errors}
            required={{ required: "Phone number is required" }}
          />
          <TextInput
            label="Address"
            name="address"
            register={register}
            errors={errors}
          />
          <TextInput
            label="District"
            name="district"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Emirate"
            name="emirate"
            control={control}
            errors={errors}
            options={emirates?.map((opt) => ({ label: opt, value: opt }))}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Additional Information
          </h3>
          <SelectInput
            label="Nationality"
            name="nationality"
            control={control}
            errors={errors}
            options={countries?.map((opt) => ({
              label: opt.name,
              value: opt.name,
            }))}
          />
          <SelectInput
            label="Country"
            name="country"
            control={control}
            errors={errors}
            options={countries?.map((opt) => ({
              label: opt.name,
              value: opt.name,
            }))}
          />
          <SelectInput
            label="Source"
            name="source"
            control={control}
            errors={errors}
            options={sources?.map((opt) => ({ label: opt, value: opt }))}
            required={{ required: "Source is required" }}
          />
          <TextInput
            label="Allergies"
            name="allergies"
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Identification
          </h3>
          <TextInput
            label="Emirates ID"
            name="nationalID"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Other ID"
            name="otherID"
            register={register}
            errors={errors}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Emergency Contact
          </h3>
          <TextInput
            label="Emergency Contact Name"
            name="emergencyContactName"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Emergency Contact Relationship"
            name="emergencyContactRelationship"
            register={register}
            errors={errors}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
            Profile Picture
          </h3>
          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUpload onFileSelect={onChange} value={value} />
            )}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-pry dark:text-blue-400 mb-4">
          Assign Doctor
        </h3>
        <div className="max-w-md">
          <SelectInput
            label="Doctor"
            name="doctorId"
            control={control}
            errors={errors}
            options={doctorsList?.map((dtr) => ({
              label: `Dr. ${dtr.user.firstName} ${dtr.user.lastName}`,
              value: dtr.id,
            }))}
            required={{ required: "Doctor is required" }}
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="w-full flex justify-center gap-5 items-center mt-8">
        <Button
          type="button"
          isLoading={isLoading}
          onClick={() => handleSubmit((data) => onSubmit(data, false))()}
        >
          Register Patient
        </Button>

        <Button
          type="button"
          isLoading={isLoading}
          onClick={() => handleSubmit((data) => onSubmit(data, true))()}
        >
          Register & Start Consultation
        </Button>
      </div>
    </form>
  );
};

export default PatientRegistrationForm;
