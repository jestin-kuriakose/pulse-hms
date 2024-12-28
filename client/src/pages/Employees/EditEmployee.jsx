import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployee,
} from "../../features/Employees/employeeSlice";
import { toast } from "react-toastify";
import moment from "moment";
import EmployeeForm from "../../features/Employees/components/employees/EmployeeForm";
import { MainHeading } from "../../components/ui";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentEmployee = useSelector(
    (state) => state.employees.currentEmployee
  );
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (selectedOptions) => {
    setFormData({ ...formData, department: selectedOptions });
  };

  const onSubmit = async (data) => {
    console.log("Renders...");
    try {
      await dispatch(
        updateEmployee({
          id,
          ...data,
          department: data.department.map((dept) => dept.value),
          hireDate: moment(data.hireDate).format("YYYY-MM-DD"),
        })
      ).unwrap();
      toast.success("Employee details updated successfully");
      navigate(`/employees/${id}`);
    } catch (error) {
      toast.error("Failed to update employee details");
    }
  };

  if (error) {
    return (
      <div className="w-full text-pry h-screen flex items-center justify-center text-center bg-white">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-lg my-8 mx-auto max-w-6xl">
      <div className="flex justify-between items-center">
      <MainHeading title={"Edit Employee"} /></div>
      <EmployeeForm
        onSubmit={onSubmit}
        initialData={currentEmployee}
        isNewEmployee={false}
      />
    </div>
  );
};

export default EditEmployee;
