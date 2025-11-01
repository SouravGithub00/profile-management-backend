import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  res.json({user: { id: user?.id, name: user?.name, email: user?.email }, });
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { name, email } = req.body;
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });
  res.json({ user: { id: updated.id, name: updated.name, email: updated.email } });
};
