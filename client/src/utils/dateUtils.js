import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

/**
 * Convert a date string to the format "31st August 2024"
 * @param {string} dateString - Date in the format "YYYY-MM-DD"
 * @returns {string} Formatted date in the "Do MMMM YYYY" format
 */
export const formatDateToReadable = (dateString) => {
  return dayjs(dateString).format("Do MMMM YYYY");
};

export const isToday = (date) => {
  const today = new Date();
  const appointmentDate = new Date(date);

  return (
    today.getFullYear() === appointmentDate.getFullYear() &&
    today.getMonth() === appointmentDate.getMonth() &&
    today.getDate() === appointmentDate.getDate()
  );
};
