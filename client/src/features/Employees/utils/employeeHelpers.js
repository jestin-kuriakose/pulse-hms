import moment from "moment";

export const formatEmployeeName = (employee) => {
  return `${employee.lastName}, ${employee.firstName}`;
};

export const calculateYearsOfService = (joinDate) => {
  const now = new Date();
  const join = new Date(joinDate);
  return now.getFullYear() - join.getFullYear();
};

export const defaultScheduleTime = (startHour = 9, endHour = 17) => {
  const today = new Date();
  const start = moment(today)
    .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 })
    .toDate();
  const end = moment(today)
    .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 })
    .toDate();

  return { start, end };
};
