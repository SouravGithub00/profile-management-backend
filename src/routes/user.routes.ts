import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getProfile);
router.put("/updateme", authMiddleware, updateProfile);

export default router;
