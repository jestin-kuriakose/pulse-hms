import prisma from "../DB/db.config.js";
import { errors } from "@vinejs/vine";
import {
  addEmployeeSchema,
  updateEmployeeSchema,
} from "../validations/employeeValidation.js";
import bcrypt from "bcryptjs";
import { validateSchema } from "../utils/validateSchema.js";
import moment from "moment-timezone";
import AuditLogService from "../services/AuditLogService.js";

class EmployeeController {
  static async addEmployee(req, res) {
    try {
      const payload = await validateSchema(addEmployeeSchema, req.body);
      const currentUserId = req.user.id;

      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        return res.status(400).json({
          errors: { email: "Email already taken. Please use another one" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            email: payload.email,
            password: hashedPassword,
            role: payload.position,
            firstName: payload.firstName,
            lastName: payload.lastName,
          },
        });

        const updatedHireDate = moment
          .tz(payload.hireDate, "Asia/Dubai")
          .startOf("day")
          .toDate();

        const employee = await prisma.employee.create({
          data: {
            userId: user.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            department: payload.department,
            position: payload.position,
            hireDate: updatedHireDate,
            salary: parseFloat(payload.salary),
            phoneNumber: payload.phoneNumber.replace(/-/g, ""),
            address: payload.address,
            createdById: currentUserId,
            updatedById: currentUserId,
          },
          include: {
            user: true,
            createdBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            updatedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        });

        await AuditLogService.logAction(
          employee.id,
          currentUserId,
          "CREATE_EMPLOYEE",
          { newValues: employee },
          { entityType: "employee" }
        );

        return employee;
      });

      return res.status(201).json(result);
    } catch (error) {
      return EmployeeController.handleError(error, res);
    }
  }

  static async getEmployees(req, res) {
    try {
      const employees = await prisma.employee.findMany({
        where: { deleted: false, position: { not: "DEVELOPER" } },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      });
      res.json(employees);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
          deleted: false,
          position: { not: "DEVELOPER" },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      });

      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      const restructuredEmployee = {
        ...employee,
        email: employee.user.email,
        firstName: employee.user.firstName,
        lastName: employee.user.lastName,
        role: employee.user.role,
        hireDate: moment(employee.hireDate).format("YYYY-MM-DD"),
        department: employee.department.map((dept) => ({
          value: dept,
          label: dept,
        })),
        user: undefined, // Remove the nested user object
      };

      res.json(restructuredEmployee);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const payload = await validateSchema(updateEmployeeSchema, req.body);
      const currentUserId = req.user.id;

      const oldEmployee = await prisma.employee.findUnique({
        where: {
          id: parseInt(id),
          deleted: false,
          position: { not: "DEVELOPER" },
        },
        include: { user: true },
      });

      if (!oldEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      const updatedHireDate = moment
        .tz(payload.hireDate, "Asia/Dubai")
        .startOf("day")
        .toDate();

      const updatedEmployee = await prisma.$transaction(async (prisma) => {
        const updated = await prisma.employee.update({
          where: { id: parseInt(id) },
          data: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            department: payload.department,
            position: payload.position,
            salary: parseFloat(payload.salary),
            hireDate: updatedHireDate,
            phoneNumber: payload.phoneNumber.replace(/-/g, ""),
            address: payload.address,
            updatedBy: { connect: { id: currentUserId } },
            user: {
              update: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                ...(payload.email && { email: payload.email }),
              },
            },
          },
          include: {
            user: true,
            createdBy: {
              select: { id: true, firstName: true, lastName: true },
            },
            updatedBy: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        });

        const changes = {};
        for (const [key, value] of Object.entries(updated)) {
          if (JSON.stringify(oldEmployee[key]) !== JSON.stringify(value)) {
            changes[key] = { old: oldEmployee[key], new: value };
          }
        }

        await AuditLogService.logAction(
          updated.id,
          currentUserId,
          "UPDATE_EMPLOYEE_DETAILS",
          changes,
          { entityType: "employee" }
        );

        return updated;
      });

      res.json(updatedEmployee);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;

      await prisma.$transaction(async (prisma) => {
        const employee = await prisma.employee.update({
          where: {
            id: parseInt(id),
          },
          data: {
            deleted: true,
            deletedAt: new Date(),
            user: {
              update: {
                deleted: true,
                deletedAt: new Date(),
              },
            },
          },
          include: {
            user: true,
          },
        });

        await AuditLogService.logAction(
          employee.id,
          currentUserId,
          "SOFT_DELETE_EMPLOYEE",
          {},
          { entityType: "employee" }
        );
      });

      res.json({ message: "Employee soft deleted successfully" });
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async getEmployeeSchedule(req, res) {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;

      const schedule = await prisma.schedule.findMany({
        where: {
          employeeId: parseInt(id),
          startTime: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        orderBy: {
          startTime: "asc",
        },
      });

      res.json(schedule);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async saveEmployeeSchedule(req, res) {
    try {
      const { id } = req.params;
      const { date, start, end } = req.body.schedule;
      const currentUserId = req.user.id;

      const savedSchedule = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: parseInt(currentUserId),
          },
        });
        const result = await prisma.schedule.create({
          data: {
            employeeId: parseInt(id),
            startTime: new Date(`${date}T${start}`),
            endTime: new Date(`${date}T${end}`),
            createdById: currentEmployee.id,
            updatedById: currentEmployee.id,
          },
        });

        await AuditLogService.logAction(
          parseInt(id),
          currentUserId,
          "SCHEDULE_CREATE",
          { date, start, end },
          { entityType: "schedule" }
        );

        return result;
      });

      res.json(savedSchedule);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async updateEmployeeSchedule(req, res) {
    try {
      const { id, scheduleId } = req.params;
      const { date, start, end } = req.body.schedule;
      const currentUserId = req.user.id;

      const savedSchedule = await prisma.$transaction(async (prisma) => {
        const oldSchedule = await prisma.schedule.findUnique({
          where: {
            id: parseInt(scheduleId),
          },
        });
        const updatedSchedule = await prisma.schedule.update({
          where: {
            id: parseInt(scheduleId),
          },
          data: {
            startTime: new Date(`${date}T${start}`),
            endTime: new Date(`${date}T${end}`),
          },
        });

        const changes = {};
        for (const [key, value] of Object.entries(oldSchedule)) {
          if (
            JSON.stringify(updatedSchedule[key]) !== JSON.stringify(value) &&
            key !== "id" &&
            key !== "employeeId" &&
            key !== "createdById" &&
            key !== "updatedById" &&
            key !== "updatedAt"
          ) {
            changes[key] = { old: value, new: updatedSchedule[key] };
          }
        }

        await AuditLogService.logAction(
          parseInt(id),
          currentUserId,
          "SCHEDULE_UPDATE",
          changes,
          { entityType: "schedule" }
        );

        return updatedSchedule;
      });

      res.json(savedSchedule);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async deleteEmployeeSchedule(req, res) {
    try {
      const { id, scheduleId } = req.params;
      const currentUserId = req.user.id;

      const deletedSchedule = await prisma.$transaction(async (prisma) => {
        const schedule = await prisma.schedule.delete({
          where: {
            id: parseInt(scheduleId),
            employeeId: parseInt(id),
          },
        });

        await AuditLogService.logAction(
          parseInt(id),
          currentUserId,
          "SCHEDULE_DELETE",
          schedule,
          { entityType: "schedule" }
        );

        return schedule;
      });

      res.json({
        message: "Schedule deleted successfully",
        deletedSchedule,
      });
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static async getEmployeeAuditLogs(req, res) {
    try {
      const { id } = req.params;

      const logs = await prisma.auditLog.findMany({
        where: {
          entityId: parseInt(id),
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      res.json(logs);
    } catch (error) {
      EmployeeController.handleError(error, res);
    }
  }

  static handleError(error, res) {
    console.error("Error:", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    }
    return res.status(500).json({
      status: "500",
      message: "Something went wrong. Please try again.",
    });
  }
}

export default EmployeeController;
