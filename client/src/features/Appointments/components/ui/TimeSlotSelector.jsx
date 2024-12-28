import React from "react";

const TimeSlotSelector = ({ timeSlots, selectedSlot, unavailableSlots, handleSlotClick }) => {
  return (
    <div>
      {timeSlots?.length > 0 ? (
        timeSlots?.map((slot, index) => {
          const isUnavailable = unavailableSlots?.includes(
            slot.start + "-" + slot.end
          );
          const isSelected =
            selectedSlot?.startTime === slot.start &&
            selectedSlot?.endTime === slot.end;

          return (
            <button
              key={index}
              onClick={() => handleSlotClick(slot)}
              style={{
                backgroundColor: isUnavailable
                  ? "gray"
                  : isSelected
                  ? "red"
                  : "blue",
                color: "white",
                margin: "5px",
                cursor: isUnavailable ? "not-allowed" : "pointer",
              }}
              disabled={isUnavailable}
              type="button"
            >
              {slot.start} - {slot.end}
            </button>
          );
        })
      ) : (
        <h3 className="font-bold text-xl text-pry font-main text-center">
          Doctor not available.
        </h3>
      )}
    </div>
  );
};

export default TimeSlotSelector;
