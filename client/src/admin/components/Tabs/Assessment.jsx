import { Divider } from "@mui/material";

const Assessment = () => {
  return (
    <div className='flex flex-col items-start w-full'>
      <button className='font-main mt-6 hover:text-red-600 font-bold text-red-500 text-lg'>
        View Allergy
      </button>
      <div className='bg-gray-400 mt-2 w-full'>
        <Divider />
      </div>

      <div className='flex flex-col lg:flex-row w-full my-4 gap-6'>
        <div className=' w-full flex flex-col gap-2'>
          <label htmlFor='today' className='font-main text-pry font-bold'>
            Today's assessment
          </label>
          <select
            id='today'
            className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'
          >
            <option>Select</option>
          </select>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='past' className='font-main text-pry font-bold'>
            Past assessment
          </label>
          <select
            id='past'
            className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'
          >
            <option>Select</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
