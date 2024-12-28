import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, selectEmployeesStatus } from '../employeesSlice';

export const useEmployeeData = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectEmployeesStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  return status;
};
