import { useState } from "react";
import { DeleteForever, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
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
import { useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const [openViewAppointmentModal, setOpenViewAppointmentModal] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate()

  const rows = [
    {
      id: 1,
      name: "Jane Doe",
      age: "25",
      mobile: "090312456",
      time: "09:00 AM",
      status: "Pending",
      doctor: "John Smith",
    },
    {
      id: 2,
      name: "Jane Doe",
      age: "25",
      mobile: "090312456",
      time: "09:00 AM",
      status: "Completed",
      doctor: "John Smith",
    },
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 60, flex: 1 },
    { field: "age", headerName: "Age", width: 60 },
    { field: "mobile", headerName: "Mobile No.", width: 120, flex: 1 },
    { field: "time", headerName: "Time", width: 120, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            className={`w-full ${
              params.row.status === "Pending" ? "bg-orange-300" : "bg-green-400"
            }`}
          >
            {params.row.status}
          </button>
        );
      },
    },
    { field: "doctor", headerName: "Doctor", width: 120, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <button
              className="w-full text-pry hover:text-sec-50 transition duration-300 "
              onClick={() => setOpenViewAppointmentModal(true)}
            >
              <Visibility />
            </button>
            <button className="w-full text-red-500 hover:text-red-600 transition duration-300 ">
              <DeleteForever />
            </button>
          </div>
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

  return (
    <div className="flex mt-2 px-4 lg:px-12 py-12 bg-white w-full lg:w-5/6 mx-auto">
      <div className="w-full flex flex-col gap-2 drop-shadow-sm">
        <button
          className="bg-pry text-white h-12 hover:bg-sec-50 transition duration-300 font-main rounded-lg w-3/6 lg:w-1/4"
          onClick={() => setOpen(true)}
        >
          Add new Appointment
        </button>
        <div className="flex flex-col lg:flex-row justify-between">
          <h6 className="font-main mt-4 text-pry text-lg font-semibold">
            Appointments
          </h6>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="w-40 bg-pry py-3 px-4 focus:outline-none rounded font-main text-white"
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="h-[500px]">
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

      {/* Dialog to view appointment */}
      <Dialog
        open={openViewAppointmentModal}
        onClose={() => setOpenViewAppointmentModal(false)}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-4"
          >
            <FormControl fullWidth>
              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-12">
                <div className="sm:col-span-4">
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue="Jane"
                  />
                </div>
                <div className="sm:col-span-4">
                  <TextField
                    required
                    id="outlined"
                    label="Middle Name"
                    defaultValue="Mary"
                  />
                </div>
                <div className="sm:col-span-4">
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue="Doe"
                  />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-12">
                <div className="sm:col-span-4">
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    defaultValue="052 292 1111"
                  />
                </div>
                <div className="sm:col-span-4">
                  <TextField
                    required
                    type="email"
                    id="outlined"
                    label="Email"
                    defaultValue="jane@gmail.com"
                  />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-12">
                <div className="sm:col-span-4">
                  <TextField
                    label="Date"
                    type="date"
                    {...register("date", { required: true })}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="sm:col-span-4">
                  <TextField
                    label="Time"
                    type="time"
                    {...register("time", { required: true })}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Doctor"
                // onChange={handleChange}
              >
                <MenuItem value={1}>Dr James Doe</MenuItem>
                <MenuItem value={2}>Dr William Tom</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-multiline-static"
              label="Remarks"
              multiline
              rows={4}
              defaultValue="Need laser treatment"
            />

            <DialogActions>
              <div className="flex justify-between w-full">
                <Button
                  onClick={() => {
                    setOpenViewAppointmentModal(false)
                    navigate('/admin/register')
                  }}
                  variant="contained"
                  color="success"
                >
                  Register Patient
                </Button>

                <div>
                  <Button
                    onClick={() => setOpenViewAppointmentModal(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </div>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding new appointment */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Schedule New Appointment</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-4"
          >
            <FormControl fullWidth>
              <InputLabel shrink>Select Patient</InputLabel>
              <Select
                label="Select Patient"
                {...register("name", { required: true })}
              >
                <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
                {/* Add more patient options here */}
              </Select>
            </FormControl>
            <TextField
              label="Time"
              type="time"
              {...register("time", { required: true })}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Date"
              type="date"
              {...register("date", { required: true })}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
