import React from 'react';
import {
  LocalHospital,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
  Notifications,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkModeToggle from '../common/DarkModeToggle';
import PatientLookupModal from '../../features/PatientLookup/components/PatientLookupModal';

const Header = ({ toggleSidebar, isSidebarExpanded }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className='sticky top-0 flex z-40 justify-between items-center w-full py-3 px-4 lg:px-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md'>
      <div className='flex items-center'>
        <button
          onClick={toggleSidebar}
          className='mr-4 text-gray-600 dark:text-white hover:text-pry transition duration-300'
          aria-label="Toggle sidebar"
        >
          {isSidebarExpanded ? <CloseIcon  sx={{ color: 'inherit' }} /> : <MenuIcon  sx={{ color: 'inherit' }} />}
        </button>
        <NavLink
          to='/'
          className='text-pry dark:text-white hover:text-sec-50 transition duration-300 items-center flex'
        >
          <LocalHospital  sx={{ fontSize: 32, color: 'inherit' }}/>
          <h1 className='font-main text-xl font-bold ml-2'>HMS</h1>
        </NavLink>
      </div>

      <div className='flex items-center space-x-4'>
        <PatientLookupModal />
        <DarkModeToggle/>
        {/* <button className="text-gray-600 dark:text-white hover:text-pry transition duration-300">
          <Notifications />
        </button> */}
        <div className='flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4'>
          <AccountCircle className="text-gray-600 dark:text-white" />
          <div className='flex flex-col'>
            <h6 className='font-main text-sm font-semibold text-gray-800 dark:text-white'>{user.firstName}</h6>
            <p className='font-main text-xs text-gray-600 dark:text-gray-300 capitalize'>{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;