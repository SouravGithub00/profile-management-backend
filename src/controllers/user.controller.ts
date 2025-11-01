import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        githubId: user.githubId ?? null,
      },
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { name, email, githubId } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Build data object only with provided fields so we don't overwrite with undefined
    const data: { name?: string | null; email?: string; githubId?: string | null } = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (githubId !== undefined) data.githubId = githubId;

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
    });

    res.json({
      user: {
        id: updated.id,
        name: updated.name ?? null,
        email: updated.email,
        githubId: updated.githubId ?? null,
      },
    });
  } catch (e: any) {
    console.error("updateProfile error:", e);
    // Handle unique constraint (email/githubId) errors from Prisma by checking the runtime error code
    if ((e as any)?.code === "P2002") {
      const target = (e.meta && (e.meta as any).target) || "value";
      return res.status(409).json({ error: `Unique constraint failed on ${JSON.stringify(target)}` });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
