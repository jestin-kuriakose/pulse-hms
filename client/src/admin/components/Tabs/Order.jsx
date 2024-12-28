import { Divider } from "@mui/material";

const Order = () => {
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
            Active visit
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
            Previous visit
          </label>
          <select
            id='past'
            className=' w-auto border border-pry  py-3 px-6 focus:outline-none rounded-full font-main text-pry'
          >
            <option>Select</option>
          </select>
        </div>
      </div>

      <button className='bg-pry rounded-full px-6 py-3 mt-8 w-2/4 hover:bg-sec-50 transition duration-300 mx-auto text-white'>
        Add New Order
      </button>
    </div>
  );
};

export default Order;
