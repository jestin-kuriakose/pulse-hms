import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { addPatientConsultationSchema } from "../validations/patientConsultationValidation.js";
import supabase from "../config/supabaseClient.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AuditLogService from "../services/AuditLogService.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

class ConsultationsController {
  // Get All Consultations by Date
  static async getConsultations(req, res) {
    const { startDate, endDate, search } = req?.query;
    console.log(startDate);
    console.log(endDate);
    console.log(search);
    const sDate = new Date(startDate);
    sDate.setHours(0, 0, 0);
    const eDate = new Date(endDate);
    eDate.setHours(23, 59, 59);

    try {
      const where = {};

      // Date filtering
      if (startDate && endDate) {
        where.created_at = {
          gte: sDate.toISOString(), // Convert to Date object
          lte: eDate.toISOString(), // Convert to Date object
        };
      }

      // Search filtering
      if (search) {
        where.OR = [
          { patient: { firstName: { contains: search, mode: "insensitive" } } },
          { patient: { lastName: { contains: search, mode: "insensitive" } } },
          { patient: { email: { contains: search, mode: "insensitive" } } },
          {
            patient: { phoneNumber: { contains: search, mode: "insensitive" } },
          },
        ];
      }

      const consultations = await prisma.consultations.findMany({
        where,
        include: {
          patient: true, // Fetch related patient data
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
          billings: true,
        },
      });

      res.json(consultations);
    } catch (error) {
      ConsultationsController.handleError(error, res);
    }
  }

  // Get a single consultation by ID
  static async getSingleConsultation(req, res) {
    try {
      const { id } = req.params;
      const consultation = await prisma.consultations.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          patient: true,
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
          patientTriage: {
            include: {
              allergies: true,
              problems: {
                include: {
                  problem: true,
                },
              },
              notes: {
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
              },
            },
          },
          patientAssessment: {
            include: {
              patientMedications: {
                include: {
                  medicine: true,
                },
              },
              patientTreatments: {
                include: {
                  treatment: true,
                },
              },
              patientPackages: {
                include: {
                  package: true,
                },
              },
              notes: {
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
              },
            },
          },
        },
      });

      // Check if the consultation exists
      if (!consultation) {
        return res.status(404).json({ error: "Consultation not found" });
      }

      // Fetch all consultations for the same patient
      const otherConsultations = await prisma.consultations.findMany({
        where: {
          patientId: consultation.patientId, // Use the patientId from the single consultation
          id: { not: consultation.id }, // Exclude the current consultation from the results
        },
        include: {
          doctor: true,
        },
      });

      // Return the single consultation along with other consultations
      res.json({
        ...consultation,
        otherConsultations,
      });
    } catch (error) {
      ConsultationsController.handleError(error, res);
    }
  }

  // Get all consultations of a patient
  static async getPatientConsultations(req, res) {
    try {
      const { id } = req.params;
      const consultations = await prisma.consultations.findMany({
        where: {
          patientId: Number(id),
        },
        include: {
          doctor: {
            select: {
              firstName: true,
              lastName: true,
              position: true,
            },
          },
          billings: true,
          patientTriage: {
            include: {
              allergies: true,
              problems: {
                include: {
                  problem: true,
                },
              },
              notes: {
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
              },
            },
          },
          patientAssessment: {
            include: {
              patientMedications: {
                include: {
                  medicine: true,
                },
              },
              patientTreatments: {
                include: {
                  treatment: true,
                },
              },
              patientPackages: {
                include: {
                  package: true,
                },
              },
              notes: {
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
              },
            },
          },
        },
      });
      res.json(consultations);
    } catch (error) {
      ConsultationsController.handleError(error, res);
    }
  }

  // Add a new consultation for an existing patient
  static async addNewConsultation(req, res) {
    try {
      const body = req.body;
      const currentUserId = req.user.id;

      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });

        // Create a new triage
        const triage = await prisma.patientTriage.create({
          data: {
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
        });

        // Create a new assessment
        const assessment = await prisma.patientAssessment.create({
          data: {
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
        });

        // Create a new consultation with triage ID attached to it
        const consultation = await prisma.consultations.create({
          data: {
            appointmentId: body?.appointmentId
              ? Number(body?.appointmentId)
              : 0,
            patientId: Number(body?.patientId),
            doctorId: Number(body?.doctorId),
            patientTriageId: triage?.id,
            patientAssessmentId: assessment?.id,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
            status: "not-seen",
          },
          include: {
            patientTriage: true,
            patientAssessment: true,
          },
        });

        await AuditLogService.logAction(
          parseInt(consultation.id),
          currentUserId,
          "CREATE",
          consultation,
          { entityType: "consultation" }
        );

        return consultation;
      });

      return res.json({
        status: 200,
        message: "consultation created successfully",
        consultation: result,
      });
    } catch (error) {
      ConsultationsController.handleError(error, res);
    }
  }

  static async updatePatientTriage(req, res) {
    try {
      const { id } = req.params; // Triage ID passed via URL
      const consultId = req?.query?.consultId;
      const body = req.body;

      if (!id || !consultId) throw new Error("No ID found.");

      // Compile and validate the schema using vine
      // const validator = vine.compile(triageSchema);
      // const payload = await validator.validate(body);
      const { notes, ...payload } = body;

      // Check if the triage exists
      const triage = await prisma.patientTriage.findUnique({
        where: { id: Number(id) }, // Ensure triageId is passed from frontend
      });

      if (!triage) {
        return res.status(404).json({ error: "Triage not found" });
      }

      // Update problems: Handle existing and new problems
      const problemPromises = payload?.problems?.map(async (problemName) => {
        await prisma.triageProblem.deleteMany({
          where: {
            patientTriageId: Number(id),
          },
        });
        const existingProblem = await prisma.problem.findUnique({
          where: { name: problemName },
        });

        if (existingProblem) {
          const d = await prisma.triageProblem.create({
            data: {
              problemId: Number(existingProblem?.id),
              patientTriageId: Number(id),
            },
          });
        } else {
          const newProblem = await prisma.problem.create({
            data: { name: problemName },
          });
          const d = await prisma.triageProblem.create({
            data: {
              problemId: Number(newProblem?.id),
              patientTriageId: Number(id),
            },
          });
        }
      });

      await Promise.all(problemPromises);

      const allergyPromises = payload?.allergies?.map(async (allergyName) => {
        await prisma.triageAllergy.deleteMany({
          where: {
            patientTriageId: Number(id),
          },
        });
        const existingAllergy = await prisma.allergy.findUnique({
          where: { name: allergyName },
        });

        if (existingAllergy) {
          const d = await prisma.triageAllergy.create({
            data: {
              allergyId: Number(existingAllergy?.id),
              patientTriageId: Number(id),
            },
          });
        } else {
          const newAllergy = await prisma.allergy.create({
            data: { name: allergyName },
          });
          const d = await prisma.triageAllergy.create({
            data: {
              allergyId: Number(newAllergy?.id),
              patientTriageId: Number(id),
            },
          });
        }
      });

      await Promise.all(allergyPromises);

      const { problems, allergies, ...rest } = payload;

      // Update the triage record
      const updatedTriage = await prisma.patientTriage.update({
        where: { id: Number(id) },
        data: {
          ...rest,
        },
        include: {
          allergies: {
            include: {
              allergy: true,
            },
          },
          problems: {
            include: {
              problem: true,
            },
          },
          notes: {
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
          },
        },
      });

      await prisma.consultations.update({
        where: {
          id: Number(consultId),
        },
        data: {
          status: "nurse-seen",
        },
      });

      await AuditLogService.logAction(
        parseInt(id),
        req.user.id,
        "UPDATE",
        updatedTriage,
        { entityType: "triage" }
      );

      return res.json(updatedTriage);
    } catch (error) {
      ConsultationsController.handleError(error, res);
    }
  }

  static async updatePatientAssessment(req, res) {
    const currentUserId = req.user.id;
    try {
      upload.array("images", 3)(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const { id } = req.params; // Patient Assessment ID
        const consultId = req?.query?.consultId;
        const body = req.body;

        const validator = vine.compile(addPatientConsultationSchema);
        const payload = await validator.validate(body);

        const files = req.files;

        // Handle Images`
        let imageUrls = [];
        if (files && files.length > 0) {
          for (const file of files) {
            const fileName = `consultation-${uuidv4()}-${file.originalname}`;
            const { data, error } = await supabase.storage
              .from("sinta-bucket")
              .upload(fileName, file.buffer);

            if (error) {
              console.error("File upload error:", error.message);
              return res.status(400).json({ error: error.message });
            }
            imageUrls.push(data.path);
          }
        }

        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });

        const existingPatientAssessment =
          await prisma.patientAssessment.findUnique({
            where: { id: Number(id) },
          });

        if (!existingPatientAssessment) {
          return res.status(404).json({ error: "Consultation not found" });
        }

        const updatedConsult = await prisma.consultations.update({
          where: {
            id: Number(consultId),
          },
          data: {
            status: "doctor-seen",
          },
        });

        const patientTreatments = JSON.parse(body.treatments || "[]");
        const patientMedications = JSON.parse(body.medicines || "[]");
        const patientPackages = JSON.parse(body.packages || "[]");

        // Create or Update treatments
        for (const treatment of patientTreatments) {
          if (treatment?.newEntry) {
            await prisma.patientTreatment.create({
              data: {
                treatmentId: Number(treatment?.treatment.id),
                quantity: Number(treatment.quantity),
                notes: treatment.notes,
                patientAssessmentId: Number(id),
                billingId: Number(updatedConsult?.billingId),
              },
            });
          } else {
            await prisma.patientTreatment.update({
              where: { id: treatment?.id },
              data: {
                treatmentId: Number(treatment?.treatment.id),
                quantity: Number(treatment.quantity),
                notes: treatment.notes,
                patientAssessmentId: Number(id),
                billingId: Number(updatedConsult?.billingId),
              },
            });
          }
        }

        // Create or Update medicines
        for (const medicine of patientMedications) {
          if (medicine?.newEntry) {
            await prisma.patientMedication.create({
              data: {
                medicineId: Number(medicine.medicine.id),
                quantity: Number(medicine.quantity),
                notes: medicine.notes,
                patientAssessmentId: Number(id),
                // billingId: Number(updatedConsult?.billingId),
                createdById: currentEmployee?.id,
              },
            });
          } else {
            await prisma.patientMedication.update({
              where: { id: medicine?.id },
              data: {
                medicineId: Number(medicine.medicine.id),
                quantity: Number(medicine.quantity),
                notes: medicine.notes,
                patientAssessmentId: Number(id),
                billingId: Number(updatedConsult?.billingId),
                updatedById: currentEmployee?.id,
              },
            });
          }
        }

        // Create or Update packages
        for (const pack of patientPackages) {
          if (pack?.newEntry) {
            await prisma.patientPackage.create({
              data: {
                packageId: Number(pack.package.id),
                quantity: Number(pack.quantity),
                notes: pack.notes,
                patientAssessmentId: Number(id),
                billingId: Number(updatedConsult?.billingId),
              },
            });
          } else {
            await prisma.patientPackage.update({
              where: { id: Number(pack?.id) },
              data: {
                packageId: Number(pack.package.id),
                quantity: Number(pack.quantity),
                notes: pack.notes,
                patientAssessmentId: Number(id),
                billingId: Number(updatedConsult?.billingId),
              },
            });
          }
        }

        const updatedConsultation = await prisma.patientAssessment.update({
          where: { id: Number(id) },
          data: {
            ...payload,
            images:
              imageUrls.length > 0
                ? imageUrls
                : existingPatientAssessment.images, // Keep existing images if no new images are uploaded
          },
          include: {
            patientMedications: {
              include: {
                medicine: true,
              },
            },
            patientTreatments: {
              include: {
                treatment: true,
              },
            },
            patientPackages: {
              include: {
                package: true,
              },
            },
            notes: {
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
            },
          },
        });

        await AuditLogService.logAction(
          parseInt(id),
          req.user.id,
          "UPDATE",
          updatedConsultation,
          { entityType: "assessment" }
        );

        return res.status(200).json({ consultation: updatedConsultation });
      });
    } catch (error) {
      ConsultationsController.handleError(error, res);
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

export default ConsultationsController;
