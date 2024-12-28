import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LocalPharmacy,
  Inventory2,
  Category,
  Healing,
  Menu as MenuIcon,
} from "@mui/icons-material";

const Inventory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { name: "Medicines", path: "medicines", icon: <LocalPharmacy /> },
    { name: "Packages", path: "packages", icon: <Category /> },
    { name: "Items", path: "items", icon: <Inventory2 /> },
    { name: "Treatments", path: "treatments", icon: <Healing /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (window.innerWidth < 1024) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg hidden md:block`}
      >
        <nav className="mt-4 space-y-2">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={category.path}
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-200 dark:bg-gray-700 text-pry dark:text-white"
                    : "text-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <span>{category.icon}</span>
              {isSidebarOpen && <span>{category.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 mt-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <nav className="mt-4 space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.path)}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition w-full text-left ${
                location.pathname.includes(category.path)
                  ? "bg-blue-200 dark:bg-gray-700 text-pry dark:text-white"
                  : "text-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          {/* Toggle button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <MenuIcon className="text-gray-600 dark:text-gray-300" />
          </button>
        
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Inventory;
