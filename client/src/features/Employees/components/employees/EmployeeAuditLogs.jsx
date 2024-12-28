import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchEmployeeAuditLogs } from "../../employeeSlice";

const EmployeeAuditLogs = ({ employeeId }) => {
  const dispatch = useDispatch();
  const auditLogs = useSelector((state) => state.employees.auditLogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchEmployeeAuditLogs(employeeId))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, employeeId]);

  const formatChanges = (action, details) => {
    const parsedDetails =
      typeof details === "string" ? JSON.parse(details) : details;

    switch (action) {
      case "CREATE_EMPLOYEE":
        return `New employee created with ID ${parsedDetails.newValues.id}.`;
      case "UPDATE_EMPLOYEE_DETAILS":
        const changes = [];
        for (const [key, value] of Object.entries(parsedDetails)) {
          if (key === "phoneNumber") {
            changes.push(
              `Phone number changed from "${value.old}" to "${value.new}"`
            );
          } else if (key === "salary") {
            changes.push(`Salary updated from ${value.old} to ${value.new}`);
          } else if (key === "department") {
            changes.push(
              `Department updated from ${value.old.join(
                ", "
              )} to ${value.new.join(", ")}`
            );
          } else if (key === "position") {
            changes.push(`Position changed from ${value.old} to ${value.new}`);
          } else if (key === "address") {
            changes.push(`Address updated`);
          } else if (key === "hireDate") {
            changes.push(
              `Hire date changed from ${new Date(
                value.old
              ).toLocaleDateString()} to ${new Date(
                value.new
              ).toLocaleDateString()}`
            );
          }
          // Ignore createdBy, updatedBy, and other system fields
        }
        return changes.join(". ");
      case "SOFT_DELETE":
        return "Employee record marked as deleted.";
      case "SCHEDULE_UPDATE":
        const { date, start, end } = parsedDetails;
        return `Schedule updated for ${date || "N/A"} from ${
          start || "N/A"
        } to ${end || "N/A"}.`;
      case "SCHEDULE_DELETE":
        const startTime = parsedDetails.startTime
          ? moment(parsedDetails.startTime).format("YYYY-MM-DD HH:mm")
          : "N/A";
        const endTime = parsedDetails.endTime
          ? moment(parsedDetails.endTime).format("YYYY-MM-DD HH:mm")
          : "N/A";
        return `Schedule deleted for ${startTime} to ${endTime}.`;
      default:
        return "Action details not available.";
    }
  };

  if (isLoading) {
    return <div>Loading audit logs...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Changes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {auditLogs.map((log) => (
            <tr key={log.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {moment(log.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.action}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.user.firstName} {log.user.lastName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatChanges(log.action, log.details)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAuditLogs;
