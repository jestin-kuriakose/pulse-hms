import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CustomToolbar } from "../common/CustomToolbar";
import { useDarkMode } from "../../../../contexts/DarkModeContext";

const localizer = momentLocalizer(moment);

const EmployeeScheduleCalendar = ({
  events,
  handleSelectEvent,
  handleSelectSlot,
}) => {
  const { isDarkMode } = useDarkMode();

  const eventStyleGetter = (event) => ({
    className: `
      bg-sec-500 dark:bg-sec-700 
      text-white 
      rounded 
      px-1 py-0.5 
      text-sm
    `,
  });

  const dayPropGetter = (date) => ({
    className: `
      ${
        date.getDay() === 0 || date.getDay() === 6
          ? "bg-gray-100 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
      }
    `,
  });

  return (
    <div className={`h-full ${isDarkMode ? "dark" : ""}`}>
      <Calendar
        key={events.length}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        views={["month"]}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        components={{
          toolbar: CustomToolbar,
        }}
        className="h-full font-main text-gray-900 dark:text-gray-100"
      />
    </div>
  );
};

export default EmployeeScheduleCalendar;
