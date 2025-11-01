import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, githubId: user.githubId }, });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, githubId } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        githubId: githubId || null,
      },
    });

    // Generate JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, githubId: newUser.githubId },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

