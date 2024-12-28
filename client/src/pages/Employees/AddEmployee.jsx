import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../features/Employees/employeeSlice";
import { toast } from "react-toastify";
import EmployeeForm from "../../features/Employees/components/employees/EmployeeForm";
import { MainHeading } from "../../components/ui";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.employees.error);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      // Transform the department data
      const transformedData = {
        ...data,
        countryCode: data.countryCode.value,
        department: data.department.map((dept) => dept.value),
      };

      await dispatch(addEmployee(transformedData)).unwrap();
      toast.success("Employee added successfully!");
      navigate("/employees");
    } catch (err) {
      toast.error(err.message || "Failed to add employee");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-center items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row mt-3">
        <MainHeading title={"Add New Employee"} />
      </div>
      <EmployeeForm onSubmit={onSubmit} isNewEmployee={true} />
    </div>
  );
};

export default AddEmployee;
