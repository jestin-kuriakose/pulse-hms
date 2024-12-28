import vine from '@vinejs/vine';

const roles = ['admin', 'doctor', 'nurse', 'receptionist', 'developer'];

export const registerSchema = vine.object({
  email: vine.string().toLowerCase().trim().email(),
  password: vine.string().minLength(8).maxLength(32),
  firstName: vine.string().trim().minLength(2).maxLength(50),
  lastName: vine.string().trim().minLength(2).maxLength(50),
  role: vine.enum(roles),
});

export const loginSchema = vine.object({
  email: vine.string().email().trim().toLowerCase(),
  password: vine.string().minLength(8).maxLength(32),
});
