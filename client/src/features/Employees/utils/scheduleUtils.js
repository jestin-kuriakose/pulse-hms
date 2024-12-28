export const formatShiftTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  export const calculateTotalHours = (schedule) => {
    return schedule.reduce((total, shift) => {
      const start = new Date(shift.start);
      const end = new Date(shift.end);
      const hours = (end - start) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
  };
  