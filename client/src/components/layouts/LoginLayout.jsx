// src/components/layouts/LoginLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LocalHospital } from "@mui/icons-material";
import LoginImg from "/images/loginImg.svg";

const LoginLayout = ({ children }) => {
  return (
    <div className='lg:h-screen flex justify-center items-center w-full'>
      <div className='bg-pry lg:flex flex-col px-32 hidden py-12 h-full w-2/4 gap-2'>
        <div className='flex items-center justify-center'>
          <NavLink to='/'>
            <span className='text-xl font-bold cursor-pointer text-white gap-2 font-heading justify-center hover:text-sec transition duration-300 flex items-center'>
              <LocalHospital />
              PULSE HMS
            </span>
          </NavLink>
        </div>
        <div className='flex flex-col w-full h-full gap-4 items-center justify-center'>
          <img src={LoginImg} alt='login' className='w-3/5' />
        </div>
      </div>

      <div className='bg-sec-100 flex py-8 flex-col lg:px-32 px-6 h-screen w-full lg:w-2/4 lg:gap-4 gap-6 justify-center lg:py-36 my-auto'>
        <NavLink
          className='text-pry hover:text-sec transition duration-300'
          to='/'
        >
          <Home />
        </NavLink>
        <h1 className='font-heading text-3xl text-pry font-bold mt-8 lg:mt-16'>
          Login
        </h1>
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
