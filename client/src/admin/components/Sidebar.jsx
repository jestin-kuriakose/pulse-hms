import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Logout,
  DashboardOutlined,
  Settings,
  CalendarToday,
  PersonAddOutlined,
  MonetizationOn,
  ArrowForwardIos,
  ArrowBackIos,
  MedicalServices,
  Vaccines,
  AccountTree,
  Groups2,
  ListAlt,
  PriceChange,
} from "@mui/icons-material";
import patientList from "../../assets/images/patientList.svg";
import doctors from "../../assets/images/doctors.svg";
import departments from "../../assets/images/departments.png";
import money from "../../assets/images/money.svg";
import employees from "../../assets/images/employees.png";
import drugs from "../../assets/images/drugs.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navElements = [
    { title: "Dashboard", path: "dashboard", icon: <DashboardOutlined /> },
    { title: "Appointments", path: "appointments", icon: <CalendarToday /> },
    { title: "Registration", path: "register", icon: <PersonAddOutlined /> },
    { title: "Patients", path: "patients", icon: <ListAlt /> },
    { title: "Doctors", path: "doctors", icon: <MedicalServices /> },
    { title: "Billing", path: "billing", icon: <MonetizationOn /> },
    // { title: "Departments", path: "departments", icon: <AccountTree /> },
    // { title: "Finances", path: "finance", icon: <PriceChange /> },
    // { title: "Employees", path: "employees", icon: <Groups2 /> },
    // { title: "Prescriptions", path: "prescriptions", icon: <Vaccines /> },
    // { title: "Settings", path: "settings", icon: <Settings /> },
  ];

  return (
    <div className='flex'>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } lg:translate-x-0 lg:relative fixed inset-y-0 left-0 flex flex-col transition-all duration-500 ease-in-out z-50 shadow-lg bg-white ${
          isCollapsed ? "lg:w-[80px]" : "lg:w-[316px]"
        } w-72 overflow-hidden overflow-x-hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className='text-pry lg:hidden absolute right-4 top-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className='flex-1 overflow-y-auto'>
          <div className='flex flex-col gap-2 mt-8'>
            {navElements.map((element, index) => (
              <NavLink
                to={element.path}
                key={index}
                onClick={() => setIsOpen(false)}
                className={(navData) =>
                  navData.isActive
                    ? `text-pry bg-sec-100 text-lg rounded-r-full inline-flex font-main items-center space-x-4 py-4 px-8 ${
                        isCollapsed ? "justify-center" : ""
                      }`
                    : `text-pry hover:bg-sec-100 rounded-r-full inline-flex font-main text-lg items-center space-x-4 py-4 px-8 transition duration-300 ${
                        isCollapsed ? "justify-center" : ""
                      }`
                }
              >
                <span>{element.icon}</span>
                {!isCollapsed && <p>{element.title}</p>}
              </NavLink>
            ))}
            <button
              className={`text-pry font-main flex items-center space-x-4 py-4 px-8 rounded-r-full hover:bg-sec-100 transition duration-300 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Logout />
              {!isCollapsed && (
                <span className='text-pry font-main font-medium text-lg'>
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Collapse Button */}
      <div
        className={`hidden lg:flex flex-col z-50 items-center transition-transform duration-500`}
        style={{
          position: "absolute",
          top: "50%",
          left: isCollapsed ? "78px" : "318px",
          transform: "translateY(-50%)",
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='bg-pry h-16 w-8 p-2 text-white rounded-full shadow-lg'
        >
          {isCollapsed ? <ArrowForwardIos /> : <ArrowBackIos />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
