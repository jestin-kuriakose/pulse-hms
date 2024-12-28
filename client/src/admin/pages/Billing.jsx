import { useState } from "react";
import { DeleteForever, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const Billing = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const rows = [
    {
      id: 1,
      name: "Jane Doe",
      service: "Routine Checkup",
      date: "12-08-24",
      cost: "$25,000",
      status: "unpaid",
    },
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 60, flex: 1 },
    { field: "service", headerName: "Service Provided", width: 120, flex: 1 },
    { field: "cost", headerName: "Cost", width: 100 },
    { field: "date", headerName: "Date", width: 120, flex: 1 },

    {
      field: "status",
      headerName: "Payment Status",
      width: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            className={`w-full ${
              params.row.status === "unpaid" ? "bg-orange-300" : "bg-green-400"
            }`}
          >
            {params.row.status}
          </button>
        );
      },
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setOpen(false);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Implement filtering logic based on selectedDate
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const patients = [
    {
      id: 1,
      name: "Jane Doe",
    },
    {
      id: 2,

      name: "John Doe",
    },
  ];
  return (
    <div className='flex mt-2 px-10  py-12 bg-white w-full  '>
      <div className='w-full mx-auto flex flex-col gap-2 drop-shadow-sm'>
        <button
          className='bg-pry text-white h-12 hover:bg-sec-50 transition duration-300 font-main rounded-lg w-3/6 lg:w-1/4'
          onClick={() => setOpen(true)}
        >
          Add new Billing
        </button>
        <div className='flex flex-col gap-2 justify-between'>
          <h6 className='font-main mt-4 text-pry text-lg font-semibold'>
            Billings
          </h6>
          <div className='w-2/4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className='w-40 bg-pry py-3 px-4 focus:outline-none rounded font-main text-white'
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className='h-[800px] w-full lg:w-5/6'>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              border: 0,
              backgroundColor: "#ffffff",
              fontFamily: "Sora",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth
        className='px-8'
      >
        <DialogTitle>Add New Billing</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-sm font-main font-medium text-gray-700'>
                Select Patient
              </label>
              <select
                {...register("patientName", {
                  required: "Patient is required",
                })}
                className={`mt-1 p-2 block w-full border ${
                  errors.patientName ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              >
                <option value=''>Select patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>
              {errors.patientName && (
                <p className='text-red-500 text-sm font-main mt-1'>
                  {errors.patientName.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-main font-medium text-gray-700'>
                Service Provided
              </label>
              <input
                {...register("serviceProvided", {
                  required: "Service provided is required",
                })}
                className={`mt-1 p-2 block w-full border ${
                  errors.serviceProvided ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.serviceProvided && (
                <p className='text-red-500 text-sm font-main mt-1'>
                  {errors.serviceProvided.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-main font-medium text-gray-700'>
                Cost
              </label>
              <input
                type='number'
                {...register("cost", { required: "Cost is required", min: 0 })}
                className={`mt-1 p-2 block w-full border ${
                  errors.cost ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.cost && (
                <p className='text-red-500 text-sm font-main mt-1'>
                  {errors.cost.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-main font-medium text-gray-700'>
                Billing Date
              </label>
              <input
                type='date'
                {...register("billingDate", {
                  required: "Billing date is required",
                })}
                className={`mt-1 p-2 block w-full border ${
                  errors.billingDate ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.billingDate && (
                <p className='text-red-500 text-sm font-main mt-1'>
                  {errors.billingDate.message}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-main font-medium text-gray-700'>
                Payment Status
              </label>
              <select
                {...register("paymentStatus", {
                  required: "Payment status is required",
                })}
                className={`mt-1 p-2 block w-full border ${
                  errors.paymentStatus ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              >
                <option value=''>Select status</option>
                <option value='paid'>Paid</option>
                <option value='unpaid'>Unpaid</option>
              </select>
              {errors.paymentStatus && (
                <p className='text-red-500 text-sm font-main mt-1'>
                  {errors.paymentStatus.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='mt-4 w-full bg-pry hover:bg-sec-50 text-white font-main  transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit Billing
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
