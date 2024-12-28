import { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import AuditLogService from "../services/AuditLogService.js";

class NotesController {
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
  static async addPatientTriageNote(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const employee = await prisma.employee.findUnique({
          where: {
            userId: Number(currentUserId),
          },
        });
        console.log(currentUserId);
        console.log(employee);
        const note = await prisma.note.create({
          data: {
            patientTriageId: Number(body.patientTriageId),
            content: body.note,
            noteType: body.noteType,
            createdBy: employee.id,
          },
          include: {
            employee: {
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

        await AuditLogService.logAction(
          note.patientTriageId,
          currentUserId,
          "NOTE_ADD",
          note,
          { entityType: "patientTriage" }
        );

        return note;
      });
      res.status(200).json(result);
    } catch (error) {
      NotesController.handleError(error, res);
    }
  }

  static async addPatientAssessmentNote(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const employee = await prisma.employee.findUnique({
          where: {
            userId: Number(currentUserId),
          },
        });
        const note = await prisma.note.create({
          data: {
            patientAssessmentId: Number(body.patientAssessmentId),
            content: body.note,
            noteType: body.noteType,
            createdBy: employee.id,
          },
          include: {
            employee: {
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
        await AuditLogService.logAction(
          note.patientAssessmentId,
          currentUserId,
          "NOTE_ADD",
          note,
          { entityType: "patientAssessment" }
        );
        return note;
      });
      res.status(200).json(result);
    } catch (error) {
      NotesController.handleError(error, res);
    }
  }

  static async getPatientTriageNotes(req, res) {
    const { patientTriageId } = req.params;
    try {
      const notes = await prisma.note.findMany({
        where: {
          patientTriageId: Number(patientTriageId),
        },
      });
      res.status(200).json(notes);
    } catch (error) {
      NotesController.handleError(error, res);
    }
  }

  static async getPatientAssessmentNotes(req, res) {
    const { patientAssessmentId } = req.params;
    try {
      const notes = await prisma.note.findMany({
        where: {
          patientAssessmentId: Number(patientAssessmentId),
        },
      });
      res.status(200).json(notes);
    } catch (error) {
      NotesController.handleError(error, res);
    }
  }
}

export default NotesController;
