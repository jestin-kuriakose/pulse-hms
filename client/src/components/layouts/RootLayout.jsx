import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Dashboard,
  Consultations,
  Appointments,
  Settings,
  Departments,
  Earnings,
  Employees,
  Registration,
  Billing,
  SingleConsultation,
  SingleBilling,
} from "../../pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleEmployee from "../../pages/Employees/SingleEmployee";
import AddEmployee from "../../pages/Employees/AddEmployee";
import EditEmployee from "../../pages/Employees/EditEmployee";
import withRoleAuthorization from "../../utils/withRoleAuthorization";
import Inventory from "../../pages/Admin/Inventory/Inventory";
import Medicines from "../../pages/Admin/Inventory/Medicines";
import Packages from "../../pages/Admin/Inventory/Packages";

const EmployeesWithAuth = withRoleAuthorization(["admin", "developer"])(
  Employees
);
const SingleEmployeeWithAuth = withRoleAuthorization(["admin", "developer"])(
  SingleEmployee
);
const AddEmployeeWithAuth = withRoleAuthorization(["admin", "developer"])(
  AddEmployee
);
const EditEmployeeWithAuth = withRoleAuthorization(["admin", "developer"])(
  EditEmployee
);

const RootLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsHovered(false);
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth < 1024) {
          setIsSidebarExpanded(false);
        }
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarExpanded={isSidebarExpanded || isHovered}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar is rendered conditionally based on screen size */}
        {(isSidebarExpanded || window.innerWidth >= 1024) && (
          <Sidebar
            isExpanded={isSidebarExpanded || isHovered}
            setIsExpanded={setIsSidebarExpanded}
            ref={sidebarRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isClickedOutside={isClickedOutside}
          />
        )}
        {/* Adjust main content margin based on sidebar state */}
        <main
          className={`flex-1 bg-sec-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 overflow-y-auto transition-all duration-300 lg:ml-20`}
        >
          <ToastContainer />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
