import dayjs from "dayjs";

export function generateTimeSlots(startTime, endTime, intervalMinutes) {
  const slots = [];
  let currentTime = dayjs(startTime);
  const end = dayjs(endTime);

  while (currentTime.isBefore(end)) {
    const nextTime = currentTime.add(intervalMinutes, 'minute');
    slots.push({
      start: currentTime.format("HH:mm"),
      end: nextTime.format("HH:mm"),
    });
    currentTime = nextTime;
  }

  return slots;
}

export function checkUnavailableSlots(appointments, timeSlots, date) {
  const unavailableSlots = new Set();

  appointments?.forEach(appointment => {
    if (dayjs(appointment.date).isSame(date, 'day')) {
      timeSlots.forEach(slot => {
        if (appointment.startTime === slot.start && appointment.endTime === slot.end) {
          unavailableSlots.add(slot.start + '-' + slot.end);
        }
      });
    }
  });

  return Array.from(unavailableSlots);
}
