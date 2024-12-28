import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "../../../Employees/components/common/CustomToolbar";

const localizer = momentLocalizer(moment);

const AppointmentCalendar = ({ availability, selectedDate, onSelectDate, currentAppointment }) => {
  const [calendarSelectedDate, setCalendarSelectedDate] =
    useState(selectedDate);

  const events = availability.map((avail) => ({
    start: new Date(avail.startTime),
    end: new Date(avail.startTime),
    title: "Available",
  }));

  const handleSelectSlot = (slotInfo) => {
    const newDate = moment(slotInfo.start);
    setCalendarSelectedDate(newDate);
    onSelectDate(newDate);
  };

  const dayPropGetter = useCallback(
    (date) => {
      if (moment(date).isSame(calendarSelectedDate, "day")) {
        return {
          style: {
            backgroundColor: "#bbddfc",
            borderRadius: "0",
          },
        };
      }
      if (moment(date).isSame(moment(currentAppointment?.date), "day")) {
        return {
          style: {
            backgroundColor: "#ffd700", // Gold color for existing appointment
            borderRadius: "0",
          },
        };
      }
      return {};
    },
    [calendarSelectedDate, currentAppointment?.date]
  );
  

  return (
    <div className="h-[400px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
        selectable
        defaultDate={selectedDate.toDate()}
        value={selectedDate}
        activeStartDate={selectedDate}
        views={["month"]}
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#4CAF50",
            borderRadius: "0",
          },
        })}
        dayPropGetter={dayPropGetter}
        date={calendarSelectedDate.toDate()}
        onNavigate={(date) => setCalendarSelectedDate(moment(date))}
      />
    </div>
  );
};

export default AppointmentCalendar;
