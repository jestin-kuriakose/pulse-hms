import { generateRandomNum, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { addDoctorSchema } from "../validations/doctorValidation.js";
import bcrypt from "bcryptjs";

class DoctorController {
  // Create a new Doctor
  static async addDoctor(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(addDoctorSchema);
      const payload = await validator.validate(body);
      console.log(body);
      const findDoctor = await prisma.doctors.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (findDoctor) {
        return res.status(400).json({
          errors: {
            email: "Email already taken. Please use another one",
          },
        });
      }
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      // Save the Doctor data in the database
      const doctor = await prisma.doctors.create({
        data: payload,
      });

      // Return a success response
      return res.status(200).json(doctor);
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // Handle validation errors
        return res.status(400).json({ errors: error.messages });
      } else {
        // Handle other errors
        console.error("Error: ", error);
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  // Get all Doctors
  static async getDoctors(req, res) {
    try {
      const doctors = await prisma.doctors.findMany();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Doctors" });
    }
  }

  // Get a Single Doctor by ID
  static async getSingleDoctor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const doctor = await prisma.doctors.findFirst({
        where: { id: parseInt(id) },
      });

      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }

      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Doctor" });
    }
  }

  // Update a Doctor by ID
  static async updateDoctor(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id || !body) {
        return res.status(404).json({ error: "No ID or body found" });
      }

      const updatedDoctor = await prisma.doctors.update({
        where: { id: parseInt(id) },
        data: body,
      });

      res.json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Doctor" });
    }
  }
}

export default DoctorController;
