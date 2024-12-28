// utils/initializeDeveloper.js
import bcrypt from 'bcryptjs';
import prisma from '../DB/db.config.js';

export async function isUserTableEmpty() {
  const count = await prisma.user.count();
  return count === 0;
}

export async function createInitialUser(userData) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const result = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'developer'
      }
    });
  
    await prisma.employee.create({
      data: {
        userId: user.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        position: 'DEVELOPER',
        department: ['General Medicine', 'Dentistry', 'Aesthetics'],
        createdById: user.id,
        updatedById: user.id,
      },
    });

    return user;
  })
  

  return result;
}
