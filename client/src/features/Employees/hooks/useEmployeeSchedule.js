import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeSchedule, selectEmployeeScheduleStatus } from '../employeesSlice';

export const useEmployeeSchedule = (employeeId) => {
  const dispatch = useDispatch();
  const status = useSelector(state => selectEmployeeScheduleStatus(state, employeeId));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployeeSchedule(employeeId));
    }
  }, [status, dispatch, employeeId]);

  return status;
};
