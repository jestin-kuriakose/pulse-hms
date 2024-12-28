import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Logout,
  DashboardOutlined,
  CalendarToday,
  PersonAddOutlined,
  MonetizationOn,
  MedicalServices,
  ListAlt,
  PeopleOutline,
  SettingsOutlined,
  Inventory,
  FolderOpenOutlined,
} from "@mui/icons-material";
import { hasRole } from "../../utils/roleUtils";
import { logout } from "../../features/auth/authSlice";

const Sidebar = forwardRef(
  (
    { isExpanded, setIsExpanded, onMouseEnter, onMouseLeave, isClickedOutside },
    ref
  ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isAdminExpanded, setIsAdminExpanded] = useState(false);

    const isActivePath = (path) => {
      console.log(path);
      console.log(location.pathname.split("/")[1]);
      return location.pathname.split("/")[1] === path;
    };

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
      if (isClickedOutside && window.innerWidth < 1024) {
        setIsExpanded(false);
      }
    }, [isClickedOutside]);

    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
    };

    const navElements = [
      { title: "Dashboard", path: "dashboard", icon: <DashboardOutlined /> },
      { title: "Appointments", path: "appointments", icon: <CalendarToday /> },
      {
        title: "Registration",
        path: "registration",
        icon: <PersonAddOutlined />,
      },
      ...(hasRole(user, ["admin", "developer", "nurse", "doctor"])
        ? [{ title: "Consultations", path: "consultations", icon: <ListAlt /> }]
        : []),
      { title: "Billing", path: "billing", icon: <MonetizationOn /> },
      {
        title: "Medical Records",
        path: "medical-records",
        icon: <FolderOpenOutlined />,
      },
      ...(hasRole(user, ["admin", "developer"])
        ? [
            {
              title: "Admin",
              icon: <SettingsOutlined />,
              subItems: [
                {
                  title: "Employees",
                  path: "employees",
                  icon: <PeopleOutline />,
                },
                {
                  title: "Inventory",
                  path: "admin/inventory",
                  icon: <Inventory />,
                },
              ],
            },
          ]
        : []),
    ];

    return (
      <>
        {/* Only render sidebar on larger screens or when expanded */}
        {(isExpanded || window.innerWidth >= 1024) && (
          <aside
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${
              isExpanded ? "w-64" : "w-20"
            } fixed top-[64px] left-0 bottom-0 z-40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-y-auto py-8">
                <nav className="px-4">
                  {navElements.map((element, index) => (
                    <React.Fragment key={index}>
                      {element.subItems ? (
                        <div>
                          <button
                            onClick={() => setIsAdminExpanded(!isAdminExpanded)}
                            className={`flex items-center justify-between w-full py-3 px-4 rounded-lg transition duration-200 ${
                              isAdminExpanded
                                ? "bg-sec-100 dark:bg-gray-100 text-pry"
                                : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-xl">{element.icon}</span>
                              {isExpanded && (
                                <span className="font-medium">
                                  {element.title}
                                </span>
                              )}
                            </div>
                            {isExpanded && (
                              <span
                                className={`transform transition-transform duration-200 ${
                                  isAdminExpanded ? "rotate-180" : ""
                                }`}
                              >
                                ▼
                              </span>
                            )}
                          </button>
                          {isAdminExpanded && (
                            <div className="ml-4 mt-2 space-y-2">
                              {element.subItems.map((subItem, subIndex) => (
                                <NavLink
                                  to={subItem.path}
                                  key={subIndex}
                                  className={({ isActive }) =>
                                    `flex items-center space-x-4 py-2 px-4 rounded-lg transition duration-200 ${
                                      isActive
                                        ? "bg-sec-100 dark:bg-gray-100 text-pry"
                                        : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                  }
                                >
                                  <span
                                    className={`text-xl ${
                                      isActivePath(subItem.path)
                                        ? "text-pry"
                                        : ""
                                    }`}
                                  >
                                    {subItem.icon}
                                  </span>
                                  {isExpanded && (
                                    <span className="font-medium">
                                      {subItem.title}
                                    </span>
                                  )}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          to={element.path}
                          className={({ isActive }) =>
                            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-200 ${
                              isActive
                                ? "bg-sec-100 dark:bg-gray-100 text-pry"
                                : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`
                          }
                        >
                          <span
                            className={`text-xl ${
                              isActivePath(element.path) ? "text-pry" : ""
                            }`}
                          >
                            {element.icon}
                          </span>
                          {isExpanded && (
                            <span className="font-medium">{element.title}</span>
                          )}
                        </NavLink>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              </div>
              <div className="p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-4 py-3 px-4 w-full text-left text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <Logout className="text-xl" />
                  {isExpanded && <span className="font-medium">Logout</span>}
                </button>
              </div>
            </div>
          </aside>
        )}
      </>
    );
  }
);

export default Sidebar;
