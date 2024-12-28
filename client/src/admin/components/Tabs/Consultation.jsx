import { DataGrid } from "@mui/x-data-grid";
import ImageMarker from "../../components/ImageMarker";
import face from "../../../assets/images/face.jpg";
import face2 from "../../../assets/images/profile.jpg";
import body from "../../../assets/images/body.jpg";
import { DeleteForever } from "@mui/icons-material";
import { Divider } from "@mui/material";

const Consultation = () => {
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
  const diagnsisRows = [
    {
      id: 1,
      date: "No",
      doctor: "O",
      diagnosisType: "",
      code: "",
      description: "AC",
      sta: "",
      rem: "",
    },
  ];
  const diagnosisColumns = [
    {
      field: "date",
      headerName: "Date & Time",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "doctor",
      headerName: "Doctor",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "diagnosisType",
      headerName: "Diagnosis Type",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "sta",
      headerName: "STA",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "rem",
      headerName: "REM",
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
  const managementRows = [
    {
      id: 1,
      date: "No",
      items: "",
      drug: "",
      frequency: "",
      duration: "",
    },
  ];
  const managementColumns = [
    {
      field: "date",
      headerName: "Date",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "items",
      headerName: "Item details",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "drug",
      headerName: "Drug",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
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
  return (
    <div className='flex flex-col w-full '>
      <div className='w-3/4 lg:w-full flex-col lg:flex-row flex justify-between mt-8'>
        <h6 className='font-main font-bold text-pry text-lg'>Consultation</h6>
        <button className='font-main bg-pry rounded hover:bg-sec-50 text-white py-3 px-8 transition duration-300'>
          Start New Consultation
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-4 lg:gap-8'>
        <div className='flex  lg:w-full flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Allergies</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            No Known Allergy
          </div>
        </div>
        <div className='flex  lg:w-full  flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Today's Consult</h6>
          <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
            <option>Today's Consult</option>
          </select>
        </div>
        <div className='flex lg:w-full  flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Past Consult</h6>
          <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
            <option>28-07-2024</option>
            <option>13-05-2024</option>
          </select>
        </div>
      </div>

      <div className='border-2 border-sec-100 flex flex-col lg:flex-row  w-full mt-8'>
        <div className='w-full lg:w-1/6 flex border-r-2 border-r-sec-100 justify-start  items-start  flex-col '>
          <div className='bg-pry px-4 py-4 w-full'>
            <h6 className='font-main text-white font-medium'>Summary</h6>
          </div>
          <button className='font-main text-pry text-left px-4  py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Past History
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Consultation Summary
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Complaints <span className='text-red-400'>*</span>
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Allergies <span className='text-red-400'>*</span>
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Laser/Q Notes
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Facial / Dermapen PRP
          </button>
          <div className='bg-gray-300 w-full'>
            <Divider />
          </div>
          <button className='font-main text-pry text-left px-4 py-2 hover:bg-sec-100 transition duration-300 w-full'>
            Slimming
          </button>
        </div>
        <div className='w-full lg:w-5/6 flex flex-col items-start '>
          <div className='border-b border-b-sec-100 px-4 py-4 w-full'>
            <h6 className='font-main text-pry font-medium'>
              Consultation Summary
            </h6>
          </div>
          <div className='flex flex-col lg:flex-row justify-between gap-6 w-full p-4'>
            <div className='flex flex-col gap-2 lg:w-2/4'>
              <h6 className='font-main text-pry font-bold'>
                Select Consulation
              </h6>
              <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>Jane Smith, 27-07-2024</option>
              </select>
            </div>
            <div className='flex flex-col gap-2  lg:w-2/4'>
              <h6 className='font-main text-pry font-bold'>Select Template</h6>
              <select className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>Select Template</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mt-4 w-full'>
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>
                Consulation Status
              </h6>
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

          <div className='grid grid-cols-1 lg:grid-cols-2 w-full px-4 gap-4 mt-8'>
            <div className='flex flex-col gap-2   lg:w-3/4 '>
              <h6 className='font-main text-pry font-bold'>Visit Type</h6>
              <select className='w-full lg:w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>Main</option>
              </select>
            </div>{" "}
            <div className='flex flex-col gap-2   lg:w-3/4 '>
              <h6 className='font-main text-pry font-bold'>
                Consultation Type
              </h6>
              <select className='w-full lg:w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>Op Consult</option>
              </select>
            </div>{" "}
            <div className='flex flex-col gap-2   lg:w-3/4 '>
              <h6 className='font-main text-pry font-bold'>
                Start Time
                <span className='text-red-400'>*</span>
              </h6>
              <select className='w-full lg:w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option>17:00</option>
              </select>
            </div>{" "}
            <div className='flex flex-col gap-2   lg:w-3/4'>
              <h6 className='font-main text-pry font-bold'>End Time</h6>
              <select className='w-full lg:w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'>
                <option> End Time</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 w-full px-4 mt-8'>
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>
                PBM Prescription Id
              </h6>
              <h6 className='font-main text-pry '>- - -</h6>
            </div>{" "}
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>
                {" "}
                ERX Prescription Id
              </h6>
              <h6 className='font-main text-pry '>- - -</h6>
            </div>{" "}
            <div className='flex flex-col'>
              <h6 className='font-main text-pry font-bold'>
                ERx Reference Number
              </h6>
              <h6 className='font-main text-pry '>- - -</h6>
            </div>
          </div>

          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6   lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                Complaints
                <span className='text-red-400'>*</span>
              </h6>
            </div>
            <div className='bg-white border mt-2 border-pry text-pry  rounded px-4 text-sm  w-full py-3  font-main '>
              Chief Complaint
            </div>
            <button className=' mt-2 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
              +Add a new complaint
            </button>
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6  lg:w-2/4 py-3'>
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

          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6 w-full  lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                LASER/ Q SWITCH NOTES
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry '>Notes</label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter note for LASER / Q SWITCH NOTES'
            />
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6   lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                FACIAL / DERMAPEN / PRP
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry '>Notes</label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full   font-main '
              placeholder='Enter note for FACIAL / DERMAPEN / PRP'
            />
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6   lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                SLIMMING NOTES
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry '>Notes</label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full  font-main '
              placeholder='Enter note for SLIMMING'
            />
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='flex flex-col items-start lg:flex-row lg:items-center  w-full'>
              <div className='bg-pry px-6  lg:w-2/4 py-3'>
                <h6 className='text-white font-medium uppercase font-main'>
                  DIAGNOSIS DETAILS
                  <span className='text-red-400'>*</span>
                </h6>
              </div>
              <button className=' my-4 w-full text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                Show previous diagnoses
              </button>
            </div>
            <div className='flex gap-2 flex-col lg:flex-row lg:gap-4'>
              <button className=' lg:my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add new diagnosis detail
              </button>
              <button className=' lg:my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add from problems list
              </button>{" "}
            </div>

            <div style={{ width: "100%" }} className='h-auto'>
              <DataGrid
                rows={diagnsisRows}
                columns={diagnosisColumns}
                sx={{
                  border: 0,
                  backgroundColor: "#ffffff",
                  fontFamily: "Sora",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6  w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                MANAGEMENT
              </h6>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 my-4'>
              <p className='font-main text-pry font-bold'>Totals</p>
              <div className='flex gap-2'>
                <p className='font-main text-pry'>Package Price:</p>
                <p className='font-main text-pry font-bold'>0.0</p>
              </div>
              <div className='flex gap-2'>
                <p className='font-main text-pry'>Unit Price:</p>
                <p className='font-main text-pry font-bold'>0.0</p>
              </div>
              <div className='flex gap-2'>
                <p className='font-main text-pry'>Patient Portion:</p>
                <p className='font-main text-pry font-bold'>0.0</p>
              </div>
            </div>
            <input
              className='bg-white border py-3 px-4 placeholder:text-pry border-pry text-pry  rounded text-sm lg:w-2/4 w-72   font-main '
              placeholder='Search and add new prescription'
            />
            <div className='flex items-start flex-col gap-2 lg:flex-row lg:gap-4'>
              <button className='my-2 lg:my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add new prescription items
              </button>
              <button className=' lg:my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add from history
              </button>
              <button className=' lg:my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
                + Add from favorites
              </button>{" "}
            </div>

            <div style={{ width: "100%" }} className='h-auto'>
              <DataGrid
                rows={managementRows}
                columns={managementColumns}
                sx={{
                  border: 0,
                  backgroundColor: "#ffffff",
                  fontFamily: "Sora",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <div className='flex flex-col items-start lg:mt-6 px-4 w-full'>
            <label className=' mt-2 text-sm font-main  text-pry '>
              Patient Instructions
            </label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full    font-main '
              placeholder='Instructions for patients'
            />
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6  lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                recommendations
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry '>Notes</label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full  font-main '
              placeholder='Enter  Recommendations'
            />
          </div>
          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6  lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                body image
              </h6>
            </div>
            <p className='font-main text-pry  my-4'>Face Image</p>
            <ImageMarker imageUrl={face} />
            <div className='bg-gray-200 w-full'>
              <Divider />
            </div>
            <p className='font-main text-pry  my-4'>Face Image 2</p>
            <ImageMarker imageUrl={face2} />
            <div className='bg-gray-200 w-full'>
              <Divider />
            </div>
            <p className='font-main text-pry  my-4'>Body Image</p>

            <ImageMarker imageUrl={body} />
          </div>

          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6   lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                provider notes
              </h6>
            </div>

            <label className=' mt-2 text-sm font-main  text-pry '>Notes</label>

            <textarea
              className='bg-white border py-4 h-52 placeholder:text-pry border-pry text-pry  rounded  px-4 text-sm w-full  font-main '
              placeholder='Enter Provider Notes'
            />
          </div>

          <div className='flex flex-col items-start mt-6 px-4 w-full'>
            <div className='bg-pry px-6  lg:w-2/4 py-3'>
              <h6 className='text-white font-medium uppercase font-main'>
                FOLLOWUP DETAILS
              </h6>
            </div>
            <button className=' my-4 text-sm font-main font-bold text-pry hover:text-sec-50 transition duration-300'>
              +Add followup
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
          <div className='flex w-full  flex-col lg:flex-row  gap-4  m-4  items-center justify-center'>
            <button className='border w-3/4 lg:w-40 rounded border-pry hover:bg-pry hover:text-white transition duration-300 text-pry font-main font-medium px-4 py-3'>
              Discard
            </button>
            <button className='border w-3/4 lg:w-40  rounded border-pry hover:bg-pry hover:text-white transition duration-300 text-pry font-main font-medium px-4 py-3'>
              Save
            </button>
            <button className='border w-3/4 lg:w-40 rounded bg-pry hover:bg-sec-50 transition duration-300 text-white  font-main font-medium px-4 py-3'>
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
