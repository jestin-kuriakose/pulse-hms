import { Divider } from "@mui/material";
import React from "react";

const EMRSearch = () => {
  return (
    <div className='w-full  gap-2 flex-col lg:flex-row flex justify-between mt-2'>
      <div className='bg-white w-full lg:w-1/6 h-auto py-6 flex flex-col gap-2 drop-shadow-sm'>
        <h5 className='text-xl px-4  font-bold font-main text-pry'>
          Patients' List
        </h5>
        <select className='w-3/6 lg:w-full   py-2 px-6 focus:outline-none rounded-full font-main text-pry'>
          <option>All Patients</option>
          <option>In Patients</option>
          <option>Out Patients</option>
        </select>
        <input
          className='bg-white w-3/6 lg:w-full border mx-4 placeholder:text-pry border-pry text-pry  rounded-full px-4 text-sm py-2  font-main '
          placeholder='Search by name'
        />
        <div className='bg-gray-300 mt-8 mx-4'>
          <Divider />
        </div>

        <button className='flex  flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between  '>
          <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
          <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>

          <p className='font-main text-sm text-left text-pry'>
            Assigned to Dr.Adam, Attended to.
          </p>
        </button>
        <div className='bg-gray-300  mx-4'>
          <Divider />
        </div>
        <button className='flex  flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between  '>
          <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
          <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>

          <p className='font-main text-sm text-left text-pry'>
            Assigned to Dr.Adam, Attended to.
          </p>
        </button>
        <div className='bg-gray-300  mx-4'>
          <Divider />
        </div>
        <button className='flex  flex-col items-start px-4 py-2 hover:bg-sec-100 transition duration-300 justify-between  '>
          <h6 className='text-pry font-main font-bold'>Jane Doe</h6>
          <p className='font-main font-medium text-gray-400 text-xs'>M/19Y</p>

          <p className='font-main text-sm text-left text-pry'>
            Assigned to Dr.Adam, Attended to.
          </p>
        </button>
      </div>
      <div className='bg-white w-full lg:w-5/6 flex flex-col px-4 py-8'>
        <div className='flex flex-col lg:flex-row justify-between w-full'>
          <h6 className='font-bold font-main text-pry'>Patient EMR Search</h6>
          <div className='flex space-x-2 items-center text-black'>
            <input
              className='bg-white border placeholder:text-pry border-pry text-pry  rounded-full px-8 w-full py-3  font-main '
              placeholder='Edit Name of Patient'
            />
          </div>
        </div>
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
              <div className='bg-gray-400 w-2 h-2 rounded-full'></div>
              <p className='text-gray-400 font-main font-medium'>Indian</p>
            </div>
          </div>
        </div>
        <div className='w-full bg-gray-200 my-4'>
          <Divider />
        </div>
        <h6 className='font-main text-pry font-medium'>Search Fields</h6>
        <div className='grid w-full gap-4 my-4 grid-cols-1 lg:grid-cols-4 items-end'>
          <div className='flex flex-col gap-2 '>
            <h6 className='font-main text-pry font-bold'>Based On</h6>
            <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
              <option> Department Type</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 '>
            <h6 className='font-main text-pry font-bold'>From</h6>
            <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
              <option> Date</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 '>
            <h6 className='font-main text-pry font-bold'>To</h6>
            <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
              <option> Date</option>
            </select>
          </div>
          <button className='bg-pry text-white h-12 hover:bg-sec-50 transition duration-300  font-main rounded-full  '>
            Search
          </button>
        </div>
        <h6 className='font-main text-pry text-lg font-bold'>Documents</h6>
        <div className='flex flex-col lg:flex-row gap-4 mb-2'>
          <button className='font-main hover:text-sec-50 text-pry'>
            Consent Forms
          </button>
          <button className='font-main hover:text-sec-50 text-pry'>
            Test Trend Report
          </button>
          <button className='font-main hover:text-sec-50 text-pry'>
            Vitals Trend Report
          </button>
        </div>
        <h6 className='font-main text-pry text-lg mt-4 font-bold'>
          Document Details
        </h6>

        <div className='flex flex-col lg:flex-row gap-2 w-full mt-2'>
          <p className='font-main text-pry'>
            Visit: <span className='text-pry font-bold'>0P020113</span>
          </p>
          <p className='font-main text-pry'>
            Document Date:{" "}
            <span className='text-pry font-bold'> 24-07-2024</span>
          </p>
          <p className='font-main text-pry'>
            Title:
            <span className='text-pry font-bold'> Acknowledgement</span>
          </p>
          <p className='font-main text-pry'>
            Consulted By:
            <span className='text-pry font-bold'> Sylvia</span>
          </p>
        </div>
        <div className='w-full mt-4 py-8 bg-sec-100 flex h-40 gap-4 justify-center items-center flex-col'>
          <h6 className='font-main text-pry text-lg mt-4 font-bold'>
            GenericDocumentPrint.docx
          </h6>
          <button className='bg-pry text-white py-4 hover:bg-sec-50 transition duration-300  w-2/4 font-main rounded-full  '>
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMRSearch;
