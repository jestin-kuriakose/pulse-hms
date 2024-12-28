import React from "react";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const modules = [
    {
      name: "Op Flow",
      items: [
        "Appointments",
        "Triage/ Nurse Assessment",
        "Initial Assessment",
        "Consultation",
        "Order",
      ],
    },
    {
      name: "Search",
      items: [
        "Active  Patients",
        "Visits Search",
        "Patient Test Status",
        "Patient Encounter Log",
      ],
    },
    {
      name: "Patient",
      items: ["Out Patient List", "Patient Progress Notes"],
    },
    {
      name: "Medical records",
      items: [
        "Patient EMR Search",
        "Visit EMR Search",
        "Generic Documents List",
        "Add Generic Documents",
      ],
    },
    {
      name: "scheduler",
      items: ["Doctor Scheduler Calendar View", "Services Scheduler"],
    },
  ];

  return (
    <div className='bg-white mt-2 w-full px-4 h-auto py-6 flex flex-col gap-2 drop-shadow-sm'>
      <div className='flex w-4/6 lg:w-2/4'>
        <button className='bg-pry text-white py-4 hover:bg-sec-50 transition duration-300 hover:text-white  w-2/4 font-main rounded-l  '>
          MODULES
        </button>
        <button className=' border border-pry text-pry py-4 hover:bg-sec-50 transition hover:text-white duration-300  w-2/4 font-main rounded-r  '>
          Reports
        </button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        {modules.map((item) => (
          <div
            className='flex flex-col bg-white py-4 drop-shadow '
            key={item.name}
          >
            <div className='bg-pry px-4 py-3'>
              <h6 className='font-main text-white uppercase'>{item.name}</h6>
            </div>
            <div className='flex flex-col gap-2 px-4 py-2'>
              {item.items.map((singleItem) => (
                <p key={singleItem} className='font-main text-pry '>
                  {singleItem}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
