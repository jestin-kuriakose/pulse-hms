import { Divider } from "@mui/material";

const Appointment = () => {
  return (
    <div className='flex flex-col w-full'>
      <h6 className='font-main mt-6 font-bold text-pry text-lg'>
        Upcoming Appointments
      </h6>
      <div className='bg-gray-400 mt-2 w-full'>
        <Divider />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 mt-6 gap-8'>
        <div className='flex flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Appointment Date</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            30-07-2024
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Resource/Item</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            Laser . Evoline 2
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Visit Purpose</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            Laser
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h6 className='font-main text-pry font-bold'>Time</h6>
          <div className='bg-white border   border-pry text-pry  rounded-full px-4  w-auto py-3  font-main '>
            06:24 AM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
