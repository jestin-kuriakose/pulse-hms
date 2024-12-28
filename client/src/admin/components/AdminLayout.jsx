import { useState } from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Dashboard,
  Patients,
  Appointments,
  Settings,
  EMRSearch,
  Doctors,
  Departments,
  Earnings,
  Employees,
  Prescriptions,
  Registration,
  Billing,
  SinglePatient,
} from "../pages";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTextHidden, setIsTextHidden] = useState(false);

  const toggleSidebarText = () => {
    setIsTextHidden((prev) => !prev);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header setIsOpen={setIsOpen} toggleSidebarText={toggleSidebarText} />

      <div className='flex flex-1 overflow-y-hidden'>
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isTextHidden={isTextHidden}
        />

        <main className='flex-1 bg-sec-100 overflow-y-scroll'>
          {/* Routes for the main content */}
          <Routes>
            <Route path='/dashboard/' element={<Dashboard />} />
            <Route path='/patients/' element={<Patients />} />
            <Route path='/patients/:id' element={<SinglePatient />} />
            <Route path='/patients/EMR' element={<EMRSearch />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/departments' element={<Departments />} />
            <Route path='/finance' element={<Earnings />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/prescriptions' element={<Prescriptions />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/billing' element={<Billing />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
