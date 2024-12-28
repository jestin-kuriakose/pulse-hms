import vine from '@vinejs/vine'

const departmentOptions = ['General Medicine', 'Dentistry', 'Aesthetics']
const positionOptions = ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'DEVELOPER']

export const addEmployeeSchema = vine.object({
  email: vine.string().email().trim().toLowerCase(),
  password: vine.string().minLength(8).maxLength(32),
  firstName: vine.string().trim().minLength(2).maxLength(50),
  lastName: vine.string().trim().minLength(2).maxLength(50),
  department: vine.array(vine.enum(departmentOptions)),
  position: vine.enum(positionOptions),
  hireDate: vine.date(),
  salary: vine.number().positive(),
  phoneNumber: vine.string().trim().optional(),
  address: vine.string().trim().optional(),
})

export const updateEmployeeSchema = vine.object({
  firstName: vine.string().trim().minLength(2).maxLength(50).optional(),
  lastName: vine.string().trim().minLength(2).maxLength(50).optional(),
  department: vine.array(vine.enum(departmentOptions)).optional(),
  position: vine.enum(positionOptions).optional(),
  hireDate: vine.date().optional(),
  salary: vine.number().positive().optional(),
  phoneNumber: vine.string().trim().optional(),
  address: vine.string().trim().optional(),
})