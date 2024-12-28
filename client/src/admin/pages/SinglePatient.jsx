import React, { useState } from "react";
import Consultation from "../components/Tabs/Consultation";
import Triage from "../components/Tabs/Triage";
import Appointment from "../components/Tabs/Appointment";
import Assessment from "../components/Tabs/Assessment";

import Order from "../components/Tabs/Order";
import { NavLink } from "react-router-dom";
import { ArrowBack, ArrowBackOutlined } from "@mui/icons-material";

const SinglePatient = () => {
  const tabs = [
    {
      name: "Appointment",
    },
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
  const [selectedTab, setSelectedTab] = useState("Appointment");

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className='bg-white  w-full  lg:flex flex-col px-4 py-8'>
      <NavLink
        className='rounded-full w-full my-8 bg-pry text-white py-4 px-6'
        to='/admin/patients'
      >
        <ArrowBackOutlined />
      </NavLink>
      <div className='flex gap-2 mt-6'>
        <div className='w-24 bg-white drop-shadow h-24 flex items-center justify-center rounded-lg '>
          <h4 className='font-main text-pry text-xl font-medium bg-sec-100  p-6 rounded'>
            JS
          </h4>
        </div>

        <div className='flex flex-col items-start gap-2'>
          <h4 className='font-bold text-xl text-pry font-main'>
            Ms.Jane Smith
          </h4>
          <div className='flex flex-row  flex-wrap gap-2 items-center'>
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
      <div className='drop-shadow gap-4 grid grid-cols-1 mt-6'>
        {tabs.map((tab) => (
          <div className='flex-grow' key={tab.name}>
            <button
              onClick={() => handleSelectedTab(tab.name)}
              className={`w-full px-12 lg:px-0 py-4 font-medium hover:bg-pry border-l border-l-gray-100 hover:text-white transition duration-300 font-main text-pry ${
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

      <div className='flex flex-col h-screen overflow-y-scroll'>
        {selectedTab === "Consultation" && <Consultation />}
        {selectedTab === "Triage/Nurse Assessment" && <Triage />}
        {selectedTab === "Appointment" && <Appointment />}
        {selectedTab === "Initial Assessment" && <Assessment />}
        {selectedTab === "Order" && <Order />}
      </div>
      <NavLink
        className='rounded-full font-main mx-auto  my-12 bg-pry text-white py-4 px-6'
        to='/admin/patients'
      >
        Back to Patients' List
      </NavLink>
    </div>
  );
};

export default SinglePatient;
