import { DataGrid } from "@mui/x-data-grid";
import { DeleteForever } from "@mui/icons-material";
import { Divider } from "@mui/material";
import PainAssessment from "../PainAssessment";
import { NavLink } from "react-router-dom";

const Triage = ({ selectedConsultation }) => {
  const rows = [
    { id: 1, type: "No", allergy: "O", reaction: "", st: "AC", se: "" },
  ];
  const columns = [
    {
      field: "type",
      headerName: "Type",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "allergy",
      headerName: "Allergy",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "o",
      headerName: "Reaction",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "st",
      headerName: "ST",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "se",
      headerName: "SE",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",

      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center py-2  gap-4'>
            <button className='w-full  text-red-500 hover:text-red-600 transition duration-300 '>
              <DeleteForever />
            </button>
          </div>
        );
      },
    },
  ];
  const problems = [
    "None",
    "PCOS",
    "Thyroid Problem",
    "Diabetes",
    "Autoimmune",
    "Hepatitis",
    "Previous Surgery",
    "Pregnant",
    "Others",
  ];
  return (
    <div className='flex flex-col mx-auto pr-4 w-full'>
      <div className='w-full flex-col lg:flex-row  items-center flex justify-between mt-8'>
        <h6 className='font-main font-bold text-pry text-lg'>
          Triage/Nurses Assessment for {selectedConsultation.date}
        </h6>
        <button className='font-main w-1/4 bg-pry rounded hover:bg-sec-50 text-white py-3 px-8 transition duration-300'>
          Add New Triage
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-8'>
        <div className='flex w-5/6 lg:w-full flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Allergies</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            No Known Allergy
          </div>
        </div>
        <div className='flex w-5/6 lg:w-full  flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Today’s Triage</h6>
          <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
            <option>Today’s Triage</option>
          </select>
        </div>
        <div className='flex w-5/6 lg:w-full  flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Past Triage</h6>
          <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
            <option>28-07-2024</option>
            <option>13-05-2024</option>
          </select>
        </div>
      </div>

      <div className='border-2 border-sec-100 flex flex-col lg:flex-row  w-5/6 lg:w-full mt-8'>
        <div className='w-full lg:w-1/6 flex border-r-2 border-r-sec-100 justify-start  items-start  flex-col '>
          <div className='bg-pry px-4 py-4 w-full'>
            <h6 className='font-main text-white font-medium'>Summary</h6>
          </div>
          <a
            href='#immunization'
            className='font-main text-pry text-left px-4  py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Immunization Up-To-Date
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#allergies'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Allergies
            <span className='text-red-400'>*</span>
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#allHistory'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Allergen History
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#vitals'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Vitals <span className='text-red-400'>*</span>
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#pain'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Pain Scale
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#personal'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Personal, Family & Social History
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#nurse'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Nurse Assessment
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#presentIllnes'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Present Illness <span className='text-red-400'>*</span>
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#medications'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Medications <span className='text-red-400'>*</span>
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#otherNotes'
            className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Other Notes
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <a
            href='#generic'
            className='font-main font-bold text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            Add Generic Document
          </a>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <NavLink
            to='EMR'
            className='font-main font-bold text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'
          >
            EMR View
          </NavLink>
        </div>
        <div className='w-full lg:w-5/6 flex flex-col items-start '>
          <div className='border-b border-b-sec-100 px-4 py-4 w-full'>
            <h6 className='font-main text-pry font-medium'>
              TRIAGE/NURSES ASSESSMENT
            </h6>
          </div>
          <div className='flex justify-between gap-6 w-full p-4'>
            <div className='flex flex-col gap-2 w-full'>
              <h6 className='font-main text-pry font-bold'>Select Triage</h6>
              <select className=' w-full border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>Jane Smith, 27-07-2024</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mt-4 w-full'>
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>Triage Status:</h6>
              <h6 className='font-main text-pry '>Open</h6>
            </div>
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>Referred By</h6>
              <h6 className='font-main text-pry '>- - -</h6>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <h6 className='font-main text-pry font-bold'>Order</h6>
                <h6 className='font-main text-pry '>- - -</h6>
              </div>
              <div className='flex gap-4'>
                <h6 className='font-main text-pry font-bold'>Remarks</h6>
                <h6 className='font-main text-pry '>- - -</h6>
              </div>
              <div className='flex gap-4'>
                <h6 className='font-main text-pry font-bold'>Scheduler</h6>
                <h6 className='font-main text-pry '>- - -</h6>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 w-full px-4 gap-2 mt-8'>
            <div className='  flex flex-col gap-2  '>
              <h6 className='font-main  text-pry font-bold'>
                Patient Priority
              </h6>
              <div className='gap-2 flex-col lg:flex-row flex'>
                <div className='flex items-center gap-1'>
                  <input type='radio' name='radio' className='accent-pry' />
                  <label className='font-main text-pry'>Not Urgent</label>
                </div>
                <div className='flex items-center gap-1'>
                  <input type='radio' name='radio' className='accent-pry' />
                  <label className='font-main text-pry'>Urgent</label>
                </div>
                <div className='flex items-center gap-1'>
                  <input type='radio' name='radio' className='accent-pry' />
                  <label className='font-main text-pry'>Emergency</label>
                </div>
              </div>
            </div>{" "}
            <div className='flex w-full lg:w-full flex-col gap-2  '>
              <h6 className='font-main text-pry font-bold'>
                Start Time
                <span className='text-red-400'>*</span>
              </h6>
              <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>17:00</option>
              </select>
            </div>{" "}
            <div className='flex w-full lg:W-full flex-col gap-2 '>
              <h6 className='font-main text-pry font-bold'>End Time</h6>
              <select className=' border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option> End Time</option>
              </select>
            </div>
          </div>

          <div
            id='immunization'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-3 lg:px-6 w-full lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                IMMUNIZATION UP-TO-DATE
                <span className='text-red-400'>*</span>
              </h6>
            </div>
            <div className='gap-2 py-4  flex'>
              <div className='flex items-center gap-1'>
                <input
                  type='radio'
                  name='immunization'
                  className='accent-pry'
                />
                <label className='font-main text-pry'>Yes</label>
              </div>
              <div className='flex items-center gap-1'>
                <input
                  type='radio'
                  name='immunization'
                  className='accent-pry'
                />
                <label className='font-main text-pry'>No</label>
              </div>
              <div className='flex items-center gap-1'>
                <input
                  type='radio'
                  name='immunization'
                  className='accent-pry'
                />
                <label className='font-main text-pry'>Not Available</label>
              </div>
            </div>
            <div className='bg-white border mt-2 border-pry text-pry  rounded px-4 text-sm w-full lg:w-full py-4  font-main '>
              Remarks
            </div>
          </div>
          <div
            id='allergies'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6  w-full py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                allergies
                <span className='text-red-400'>*</span>
              </h6>
            </div>
            <button className=' my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
              +Add a new allergy
            </button>
            <div style={{ width: "100%" }} className='h-auto'>
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

          <div
            id='allHistory'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6 w-full lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                ALLERGEN HISTORY
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry py-2 '>
              Notes
            </label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter note for ALLERGEN HISTORY'
            />
          </div>
          <div
            id='vitals'
            className='flex flex-col gap-2  items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6  w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                Vitals
                <span className='text-red-400'>*</span>
              </h6>
            </div>
            <div className='flex gap-4'>
              <button className=' my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add a new remark
              </button>
              <button className=' my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                Show remarks
              </button>{" "}
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='systolic'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Systolic
              </label>

              <input
                name='systolic'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='BP(mmHg)'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='diastolics'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Diastolic
              </label>

              <input
                name='diastolic'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='BP(mmHg)'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='temperature'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Temperature
              </label>

              <input
                name='temperature'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='Degree Celcius'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='height'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Height
              </label>

              <input
                name='height'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='CM'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='weight'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Weight
              </label>

              <input
                name='weight'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='KG'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='SpO2 '
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                SpO2
              </label>

              <input
                name='SpO2 '
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='%'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='BMI'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                BMI
              </label>

              <input
                name='BMI'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='BMI'
              />
            </div>
            <div className='flex flex-col w-full gap'>
              <label
                htmlFor='Pulse'
                className=' mt-2 text-sm font-main font-semibold  text-pry my-2'
              >
                Pulse
              </label>

              <input
                name='Pulse'
                className='bg-white border py-4  placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                placeholder='bpm'
              />
            </div>
            <button className=' my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
              + Add vital reading
            </button>
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-3/6lg:w-full'>
            <div className='bg-pry px-6  py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                pain scale
              </h6>
            </div>
            <div id='pain' className='bg-sec-100 px-4 py-2 my-4 w-full'>
              <div className='flex gap-2'>
                <input type='checkbox' className='accent-pry' id='pain' />
                <label className='font-main text-pry' htmlFor='pain'>
                  Moderate Pain
                </label>
              </div>
            </div>
            <PainAssessment />
          </div>
          <div
            id='personal'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='flex items-center  w-full'>
              <div className='bg-pry px-6 w-full lg:w-2/4 py-3'>
                <h6 className='text-white font-medium uppercase font-main'>
                  PERSONAL, FAMILY & SOCIAL HISTORY
                </h6>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 w-full'>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='history'
                >
                  Past Medical History
                </label>
                <textarea
                  id='history'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Past Medical History'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='family'
                >
                  Family History
                </label>
                <textarea
                  id='family'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Family History'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='social'
                >
                  Social History
                </label>
                <textarea
                  id='social'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Social History'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='surgical'
                >
                  Surgical History
                </label>
                <textarea
                  id='surgical'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Surgical History'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='current'
                >
                  Current Medical History
                </label>
                <textarea
                  id='current'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Current Medical History'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  className='font-main font-medium text-pry'
                  htmlFor='creams'
                >
                  Creams
                </label>
                <textarea
                  id='creams'
                  className='bg-white border py-4 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
                  placeholder='Creams'
                />
              </div>
            </div>
          </div>

          <div
            id='nurse'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6  w-full py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                NURSE ASSESSMENT
              </h6>
            </div>

            <label
              htmlFor='nurse'
              className=' my-2 text-sm font-main  text-pry '
            >
              NURSE ASSESSMENT
            </label>

            <textarea
              id='nurse'
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter assessment'
            />
          </div>

          <div
            id='presentIllness'
            className='grid grid-cols-1 lg:grid-cols-4 gap-6 w-3/6lg:w-full my-4 px-4'
          >
            {problems.map((problem) => (
              <button className='bg-gray-300 px-4 py-2 rounded hover:bg-pry hover:text-white transition font-main text-pry duration-300'>
                {problem}
              </button>
            ))}
          </div>
          <div
            id='medications'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6  w-full py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                Medications
                <span className='text-red-400'>*</span>
              </h6>
            </div>

            <label
              htmlFor='medications'
              className=' my-2 text-sm font-main  text-pry '
            >
              Medications
            </label>

            <textarea
              id='medications'
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter medications'
            />
          </div>

          <div
            id='otherNotes'
            className='flex flex-col items-start mt-6 px-4 w-full'
          >
            <div className='bg-pry px-6  w-full py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                Other notes
              </h6>
            </div>

            <label className=' my-2 text-sm font-main  text-pry '>
              Other Notes
            </label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter Other Notes'
            />
            <p className='font-main text-pry mt-2 font-medium'>Print options</p>
          </div>

          <div className='flex w-full lg:flex-row flex-col  gap-4  m-4  items-center justify-center'>
            <button className='border w-40 rounded border-pry hover:bg-pry hover:text-white transition duration-300 text-pry font-main font-medium px-4 py-2'>
              Discard
            </button>
            <button className='border w-40  rounded border-pry hover:bg-pry hover:text-white transition duration-300 text-pry font-main font-medium px-4 py-2'>
              Save
            </button>
            <button className='border w-40 rounded bg-pry hover:bg-sec-50 transition duration-300 text-white  font-main font-medium px-4 py-2'>
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Triage;
