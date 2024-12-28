import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Visibility, Add, Edit, Delete } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import {
  deleteEmployee,
  fetchEmployees,
} from "../../features/Employees/employeeSlice";
import { toast } from "react-toastify";
import { DeletePatientModal } from "../../features/Employees/components/modal/DeletePatientModal";
import { Button, MainHeading, Table } from "../../components/ui";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Employees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const employeesList = useSelector((state) => state.employees.list);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchEmployees());
    }
  }, [dispatch]);

  const handleDeleteEmployee = async (id) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
      toast.success("Employee deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (params) => params.row.user.firstName,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      renderCell: (params) => params.row.user.lastName,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => params.row.user.email,
    },
    { field: "phoneNumber", headerName: "Phone", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700 transition duration-300"
            onClick={() => navigate(`/employees/${params.row.id}`)}
          >
            <Visibility />
          </button>
          <button
            className="text-green-500 hover:text-green-700 transition duration-300"
            onClick={() => navigate(`/employees/edit/${params.row.id}`)}
          >
            <Edit />
          </button>
          <button
            className="text-red-500 hover:text-red-700 transition duration-300"
            onClick={() => {
              setSelectedEmployee(params.row);
              setIsDeleteModalOpen(true);
            }}
          >
            <Delete />
          </button>
        </div>
      ),
    },
  ];

  if (status === "loading") {
    return (
      <div className="w-full text-pry h-screen flex items-center justify-center text-center bg-white">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-pry h-screen flex items-center justify-center text-center bg-white">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-8 rounded-lg shadow-lg mx-4 my-8">
      <div className="flex justify-between items-center mb-8">
        <MainHeading title={"Employees"} />
        <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
          <Button
            onClick={() => navigate("/employees/add")}
            className="flex items-center"
          >
            <PlusCircleIcon className="h-6 w-6" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="h-full">
        <Table
          rows={employeesList}
          columns={columns}
          isLoading={status === "loading"}
          customStyles={{ height: "100%" }}
        />
      </div>

      <DeletePatientModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        employee={selectedEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
};

export default Employees;
