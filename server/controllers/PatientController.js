import {
  formatPhoneNumber,
  generateRandomNum,
  imageValidator,
} from "../utils/helper.js";
import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import multer from "multer";
import path from "path";
import { patientRegistrationSchema } from "../validations/patientValidation.js";
import AuditLogService from "../services/AuditLogService.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/images"));
  },
  filename: (req, file, cb) => {
    const imgExt = file.originalname.split(".").pop();
    const imageName = `${generateRandomNum()}.${imgExt}`;
    cb(null, imageName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file type");
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("profilePicture");

class PatientController {
  // Create a new Patient
  static async addPatient(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }

      try {
        const body = req.body;
        const validator = vine.compile(patientRegistrationSchema);
        const payload = await validator.validate(body);

        payload.phoneNumber = formatPhoneNumber(payload.phoneNumber);

        const findUser = await prisma.patients.findUnique({
          where: { email: payload.email },
        });
        if (findUser) {
          return res.status(400).json({
            errors: { email: "Email already taken. Please use another one" },
          });
        }

        let profilePicture = null;
        const profile = req.file;
        if (profile) {
          const message = imageValidator(profile.size, profile.mimetype);
          if (message !== null) {
            return res.status(400).json({ errors: { profile: message } });
          }
          profilePicture = profile.filename;
        }

        const lastPatient = await prisma.patients.findFirst({
          orderBy: { id: "desc" },
        });

        const newMRNumber = `SMC000${lastPatient ? lastPatient.id + 1 : 1}`;

        const existingPatient = await prisma.patients.findUnique({
          where: { mrNumber: newMRNumber },
        });
        if (existingPatient) {
          throw new Error("MR Number already exists.");
        }

        const patientData = {
          ...payload,
          mrNumber: newMRNumber,
          appointmentId: payload?.appointmentId
            ? Number(payload?.appointmentId)
            : null,
          ...(profilePicture && { profilePicture }),
        };

        const currentUserId = req.user.id;

        // Use Prisma transaction for consistency
        const patient = await prisma.$transaction(async (prisma) => {
          const currentEmployee = await prisma.employee.findUnique({
            where: { userId: currentUserId },
          });

          const createdPatient = await prisma.patients.create({
            data: {
              ...patientData,
              createdById: currentEmployee.id,
              updatedById: currentEmployee.id,
            },
          });

          await AuditLogService.logAction(
            parseInt(createdPatient.id),
            currentUserId,
            "CREATE",
            createdPatient,
            { entityType: "patient" }
          );

          return createdPatient;
        });

        return res.json({
          status: 200,
          message: "Patient created successfully",
          patient,
        });
      } catch (error) {
        PatientController.handleError(error, res);
      }
    });
  }

  // Get all patients
  static async getPatients(req, res) {
    try {
      const { search, count } = req.query;
      const where = {};

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phoneNumber: { contains: search, mode: "insensitive" } },
          { mrNumber: { contains: search, mode: "insensitive" } },
        ];
      }

      const take = count ? parseInt(count) : 10;

      const patients = await prisma.patients.findMany({
        where,
        take,
        orderBy: { firstName: "asc" },
      });

      res.json(patients);
    } catch (error) {
      PatientController.handleError(error, res);
    }
  }

  // Get a single patient
  static async getSinglePatient(req, res) {
    try {
      const { id } = req.params;
      const patient = await prisma.patients.findUnique({
        where: { id: parseInt(id) },
      });
      res.json(patient);
    } catch (error) {
      PatientController.handleError(error, res);
    }
  }

  // Centralized error handling
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

export default PatientController;
