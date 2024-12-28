import React from "react";
import moment from "moment";

const EmployeeDetails = ({ employee }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Email</span>
          <span className="font-semibold">{employee.email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Phone</span>
          <span className="font-semibold">{employee.phoneNumber}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Department</span>
          <span className="font-semibold">
            {employee.department.map(dpt => dpt.value).join(", ")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Position</span>
          <span className="font-semibold">{employee.position}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Hire Date</span>
          <span className="font-semibold">
            {moment(employee.hireDate).format("MMMM D, YYYY")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Address</span>
          <span className="font-semibold">{employee.address}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
