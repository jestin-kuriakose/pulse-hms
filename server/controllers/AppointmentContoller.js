import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { appointmentSchema } from "../validations/appointmentValidation.js";
import { formatPhoneNumber } from "../utils/helper.js";
import AuditLogService from "../services/AuditLogService.js";

class AppointmentController {
  static async createAppointment(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(appointmentSchema);
      const payload = await validator.validate(body);

      const currentUserId = req.user.id;

      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: { userId: currentUserId },
        });

        let appointment;
        if (Number(payload?.patientId) === 0) {
          payload.phoneNumber = formatPhoneNumber(payload.phoneNumber);
          appointment = await prisma.appointments.create({
            data: {
              ...payload,
              createdById: currentEmployee?.id,
              updatedById: currentEmployee?.id,
            },
            include: {
              doctor: {
                include: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                      email: true,
                      role: true,
                    },
                  },
                },
              },
            },
          });
        } else {
          const patient = await prisma.patients.findUnique({
            where: { id: Number(payload?.patientId) },
          });
          appointment = await prisma.appointments.create({
            data: {
              ...payload,
              firstName: patient?.firstName,
              lastName: patient?.lastName,
              email: patient?.email,
              phoneNumber: patient?.phoneNumber,
              createdById: currentEmployee?.id,
              updatedById: currentEmployee?.id,
            },
            include: {
              doctor: {
                include: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                      email: true,
                      role: true,
                    },
                  },
                },
              },
            },
          });
        }

        await AuditLogService.logAction(
          parseInt(appointment.id),
          currentUserId,
          "CREATE",
          appointment,
          { entityType: "appointment" }
        );

        return appointment;
      });

      return res.json(result);
    } catch (error) {
      AppointmentController.handleError(error, res);
    }
  }

  static async getAppointments(req, res) {
    const { startDate, endDate, search } = req?.query;
    const sDate = new Date(startDate);
    sDate.setHours(0, 0, 0);
    const eDate = new Date(endDate);
    eDate.setHours(23, 59, 59);

    try {
      const where = {};
      if (startDate && endDate) {
        where.date = {
          gte: sDate.toISOString(),
          lte: eDate.toISOString(),
        };
      }
      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phoneNumber: { contains: search, mode: "insensitive" } },
        ];
      }

      const appointments = await prisma.appointments.findMany({
        where,
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      res.json(appointments);
    } catch (error) {
      AppointmentController.handleError(error, res);
    }
  }

  static async updateAppointment(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const currentUserId = req.user.id;

      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: { userId: currentUserId },
        });

        const oldAppointment = await prisma.appointments.findUnique({
          where: { id: parseInt(id) },
        });

        const updatedAppointment = await prisma.appointments.update({
          where: { id: parseInt(id) },
          data: {
            ...body,
            date: new Date(body?.date).toISOString(),
            updatedById: currentEmployee?.id,
          },
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        });

        const changes = {};
        for (const [key, value] of Object.entries(oldAppointment)) {
          if (
            JSON.stringify(updatedAppointment[key]) !== JSON.stringify(value) &&
            key !== "id" &&
            key !== "createdById" &&
            key !== "updatedById" &&
            key !== "updated_at"
          ) {
            changes[key] = { old: value, new: updatedAppointment[key] };
          }
        }

        await AuditLogService.logAction(
          parseInt(updatedAppointment.id),
          currentUserId,
          "UPDATE",
          changes,
          { entityType: "appointment" }
        );

        return updatedAppointment;
      });

      res.json(result);
    } catch (error) {
      AppointmentController.handleError(error, res);
    }
  }

  static async deleteAppointment(req, res) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;

      const result = await prisma.$transaction(async (prisma) => {
        const deletedAppointment = await prisma.appointments.delete({
          where: { id: parseInt(id) },
        });

        await AuditLogService.logAction(
          parseInt(deletedAppointment.id),
          currentUserId,
          "DELETE",
          deletedAppointment,
          { entityType: "appointment" }
        );

        return deletedAppointment;
      });

      res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
      AppointmentController.handleError(error, res);
    }
  }

  // Get all appointments of a patient
  static async getAppointmentsByPatient(req, res) {
    try {
      const { id } = req.params;
      const appointments = await prisma.appointments.findMany({
        where: { patientId: parseInt(id) },
        include: {
          doctor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      res.json(appointments);
    } catch (error) {
      AppointmentController.handleError(error, res);
    }
  }

  static handleError(error, res) {
    console.error("Error:", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ status: "400", message: error.messages });
    }
    return res.status(500).json({
      status: "500",
      message: "Something went wrong. Please try again.",
    });
  }
}

export default AppointmentController;
