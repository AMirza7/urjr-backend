// src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerSchema, loginSchema } from "../schemas/auth";

/**
 * Register a new user
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body using Zod schema
    const parsed = registerSchema.parse(req.body);

    // Check if email already exists
    const existing = await User.findOne({ where: { email: parsed.email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // Create user (role, name, email, password)
    const user = await User.create({
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
      role: parsed.role,
    });

    // Sign JWT
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user and return JWT
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = loginSchema.parse(req.body);
    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ where: { email: parsed.email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log("USER FOUND:", user);

    console.log("Plain password:", parsed.password);
    console.log("Hashed password:", user.password);
    const match = await bcrypt.compare(parsed.password, user.password);
    console.log("Is password valid?", match);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get current user's profile
 */
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore: user is injected by auth middleware
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // @ts-ignore
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};
