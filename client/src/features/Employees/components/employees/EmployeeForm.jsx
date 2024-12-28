import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { employeeRoles } from "../../../../data/roles";
import { departments } from "../../../../data/departments";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Button, TextArea, TextInput } from "../../../../components/ui";
import PhoneNumberInput from "../../../../components/ui/Inputs/PhoneNumberInput";
import DateInput from "../../../../components/ui/Inputs/DateInput";
import SelectInput from "../../../../components/ui/Select/SelectInput";

const EmployeeForm = ({
  onSubmit,
  initialData = { countryCode: { label: "+971", value: "+971" } },
  isNewEmployee,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const status = useSelector((state) => state.employees.status);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label={"First Name"}
          name={"firstName"}
          register={register}
          required={{ required: "First name is required" }}
          type="text"
          errors={errors}
        />

        <TextInput
          label={"Last Name"}
          name={"lastName"}
          register={register}
          required={{ required: "Last name is required" }}
          type="text"
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label={"Email"}
          name={"email"}
          register={register}
          required={{ required: "Email is required" }}
          type="email"
          errors={errors}
        />

        <PhoneNumberInput
          label={"Phone Number"}
          name={"phoneNumber"}
          control={control}
          errors={errors}
          required={{ required: "Phone number is required" }}
        />
      </div>

      {isNewEmployee && (
        <TextInput
          label={"Password"}
          name={"password"}
          register={register}
          required={{ required: "Password is required" }}
          type="password"
          errors={errors}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={"Department"}
          name={"department"}
          control={control}
          options={departments}
          isMulti={true}
          errors={errors}
          required={{ required: "Department is required" }}
        />
        <SelectInput
          label={"Position"}
          name={"position"}
          control={control}
          options={employeeRoles.map((role) => ({
            value: role,
            label: role.charAt(0) + role.slice(1).toLowerCase(),
          }))}
          errors={errors}
          required={{ required: "Position is required" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label={"Hire Date"}
          name={"hireDate"}
          register={register}
          required={{ required: "Hire date is required" }}
          errors={errors}
          type="date"
        />
        <TextInput
          label="Salary"
          name="salary"
          register={register}
          type="number"
          errors={errors}
        />
      </div>

      <TextArea
        label="Address"
        name="address"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={status === "loading"}>
          {isNewEmployee ? "Add Employee" : "Update Employee"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
