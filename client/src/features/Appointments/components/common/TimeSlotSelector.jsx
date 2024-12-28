import React from "react";

const TimeSlotSelector = ({
  timeSlots,
  selectedSlot,
  unavailableSlots,
  handleSlotClick,
  currentAppointmentSlot,
}) => {
  console.log(currentAppointmentSlot)
  console.log(timeSlots)
 
  return (
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map((slot, index) => {
        const isUnavailable = unavailableSlots.has(`${slot.start}-${slot.end}`);
        const isSelected =
          selectedSlot?.start === slot.start &&
          selectedSlot?.end === slot.end;
        const isCurrentAppointment =
          currentAppointmentSlot?.start === slot.start &&
          currentAppointmentSlot?.end === slot.end;
          console.log(isCurrentAppointment)
        return (
          <button
            key={index}
            onClick={() => !isUnavailable && handleSlotClick(slot)}
            type="button"
            className={`p-2 rounded text-sm ${
              isUnavailable
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isCurrentAppointment
                ? "bg-yellow-300 text-yellow-800"
                : isSelected
                ? "bg-blue-500 text-white"
                
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
            disabled={isUnavailable}
          >
            {slot.start} - {slot.end}
          </button>
        );
      })}
    </div>
  );
};


export default TimeSlotSelector;
