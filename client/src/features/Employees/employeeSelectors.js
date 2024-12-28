import { createSelector } from '@reduxjs/toolkit';

export const selectAllEmployees = state => state.employees.list;

export const selectEmployeeById = createSelector(
  [selectAllEmployees, (state, employeeId) => employeeId],
  (employees, employeeId) => employees.find(employee => employee.id === employeeId)
);

export const selectEmployeeStats = createSelector(
  [selectAllEmployees],
  (employees) => ({
    totalEmployees: employees.length,
    departments: [...new Set(employees.map(e => e.department))]
  })
);

export const selectEmployeesStatus = state => state.employees.status;

export const selectEmployeeSchedule = createSelector(
  [state => state.employees.schedules, (state, employeeId) => employeeId],
  (schedules, employeeId) => schedules[employeeId] || []
);
