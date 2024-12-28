import prisma from "../DB/db.config.js";
import { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateSchema } from "../utils/validateSchema.js";

class AuthController {
  static async register(req, res) {
    try {
      // Check if the current user has permission to create a new user
      if (req.user.role !== 'admin' && req.user.role !== 'developer') {
        return res.status(403).json({
          error: "You don't have permission to create new users",
        });
      }

      const payload = await validateSchema(registerSchema, req.body);

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

      const user = await prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      const { password, ...userWithoutPassword } = user;

      return res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      return AuthController.handleError(error, res);
    }
  }

  static async login(req, res) {
    try {
      const payload = await validateSchema(loginSchema, req.body);

      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user || !(await bcrypt.compare(payload.password, user.password))) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const token = AuthController.generateToken(user);

      const { password, ...userWithoutPassword } = user;

      return res.json({
        message: "Logged in successfully!",
        access_token: token,
        user: userWithoutPassword,
      });
    } catch (error) {
      return AuthController.handleError(error, res);
    }
  }

  static generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  static handleError(error, res) {
    console.error("Error: ", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    }
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
}

export default AuthController;
