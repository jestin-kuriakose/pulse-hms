import {
  AdminPanelSettings,
  Email,
  LocalHospital,
  Notifications,
} from "@mui/icons-material";

import { Badge } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = ({ setIsOpen }) => {
  return (
    <div className='sticky top-0 flex z-40 justify-between w-full py-4 px-4  lg:px-8 bg-white drop-shadow-lg'>
      <div className='lg:hidden flex  text-pry'>
        <button onClick={() => setIsOpen(true)} className='outline-none '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
      <div className='flex items-center justify-between '>
        <NavLink
          to='/'
          className={`text-pry hover:text-sec-50 transition duration-300 items-center flex `}
        >
          <LocalHospital sx={{ fontSize: 40 }} />

          <h3 className='font-main text-xl font-semibold ml-2'>HMS</h3>
        </NavLink>
      </div>

      <div className='flex gap-4 items-center'>
        <NavLink to='notifications' className='text-pry font-main'>
          <Badge badgeContent={0} color='succeess'>
            <Notifications />
          </Badge>
        </NavLink>
        <NavLink to='chats' className='text-pry font-main'>
          <Badge badgeContent={0} color='success'>
            <Email />
          </Badge>
        </NavLink>
        <div className='flex text-pry gap-2 items-center'>
          <AdminPanelSettings />
          <div className='flex flex-col '>
            <h6 className='font-main text-pry font-bold'>Admin</h6>
            <p className='font-main text-pry text-xs'>Admin Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
