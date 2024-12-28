import { useState } from "react";
import { Divider } from "@mui/material";
import Consultation from "../components/Tabs/Consultation";
import Triage from "../components/Tabs/Triage";
import Appointment from "../components/Tabs/Appointment";
import Assessment from "../components/Tabs/Assessment";
import Order from "../components/Tabs/Order";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Pagination from "@mui/material/Pagination";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Search } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
const Patients = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Implement filtering logic based on selectedDate
  };
  const tabs = [
    // {
    //   name: "Appointment",
    // },
    {
      name: "Triage/Nurse Assessment",
    },

    {
      name: "Initial Assessment",
    },
    {
      name: "Consultation",
    },
    {
      name: "Order",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Triage/Nurse Assessment");

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className='w-full flex flex-col lg:flex-row justify-between'>
      <div className='bg-white lg:bg-gray-100 h-auto w-full lg:w-2/6 py-6 flex flex-col gap-2 drop-shadow-sm'>
        <h5 className='text-xl px-4 font-bold font-main text-pry'>
          Patients' List
        </h5>
        <div className='px-4'>
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
        <div className='flex items-center w-full gap'>
          <input
            className='bg-white lg:bg-gray-100 border mx-4 placeholder:text-pry border-pry text-pry rounded-full px-4 text-sm w-full py-3 font-main'
            placeholder='Search by name, email, or phone'
          />
          <button className='bg-pry text-white w-20 rounded-full px-4 py-2 text-sm font-main hover:bg-pry-dark'>
            <Search />
          </button>
        </div>
        <div className='bg-gray-300 mt-8 mx-4'>
          <Divider />
        </div>

        {/* Patients list with scroll */}
        <div className='flex flex-col h-screen overflow-y-scroll px-4'>
          <NavLink
            to='/admin/patients/24'
            className='flex lg:hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'
          >
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </NavLink>
          {/* Repeat this block for each patient */}
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          <button className='lg:flex hidden flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between'>
            <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
            <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>
            <p className='font-main text-sm text-left text-pry'>
              Assigned to Dr. Adam, Attended to.
            </p>
          </button>
          <div className='bg-gray-300 mx-4'>
            <Divider />
          </div>
          {/* Add more patient entries here */}
        </div>

        {/* Pagination - Uncomment if needed */}
        {/* <Pagination
          count={10} // Total number of pages
          page={page}
          onChange={handleChange}
          color='primary' // You can choose 'standard', 'outlined', or 'text'
        /> */}
      </div>

      {/* Rest of your component */}
      <div className='bg-white hidden w-full lg:w-5/6 lg:flex flex-col px-4 py-8'>
        <div className='flex gap-2'>
          <div className='w-24 bg-white drop-shadow h-24 flex items-center justify-center rounded-lg '>
            <h4 className='font-main text-pry text-xl font-medium bg-sec-100  p-6 rounded'>
              JS
            </h4>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <h4 className='font-bold text-xl text-pry font-main'>
              Ms.Jane Smith
            </h4>
            <div className='flex flex-col lg:flex-row gap-2 lg:items-center'>
              <p className='text-gray-400 font-main font-medium'>M498000</p>
              <div className='bg-gray-400 w-2 h-2 rounded-full'></div>
              <p className='text-gray-400 font-main font-medium'>Female</p>
              <div className='bg-gray-400 w-2 h-2 rounded-full'></div>
              <p className='text-gray-400 font-main font-medium'>20-09-1991</p>
              <div className='bg-gray-400 w-2 h-2 rounded-full'></div>
              <p className='text-gray-400 font-main font-medium'>30Y</p>
              <div className='bg-gray-400 w-2 h-2 rounded-full'></div>
              <p className='text-gray-400 font-main font-medium'>+3123456789</p>
            </div>
            <button className='font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
              Edit Patient's Details
            </button>
          </div>
        </div>
        <div className='drop-shadow flex flex-col w-full lg:flex-row  lg:justify-stretch mt-6'>
          {tabs.map((tab) => (
            <div className='flex-grow' key={tab.name}>
              <button
                onClick={() => handleSelectedTab(tab.name)}
                className={` w-auto px-12 lg:px-0 lg:w-full py-4 font-medium hover:bg-pry border-l border-l-gray-100 hover:text-white transition duration-300 font-main text-pry ${
                  selectedTab === tab.name
                    ? "bg-pry text-white"
                    : "bg-white text-pry"
                }`}
              >
                {tab.name}
              </button>
            </div>
          ))}
        </div>

        <div className='flex flex-col h-screen overflow-x-hidden overflow-y-scroll'>
          {selectedTab === "Consultation" && <Consultation />}
          {selectedTab === "Triage/Nurse Assessment" && <Triage />}
          {selectedTab === "Appointment" && <Appointment />}
          {selectedTab === "Initial Assessment" && <Assessment />}
          {selectedTab === "Order" && <Order />}
        </div>
      </div>
    </div>
  );
};

export default Patients;
