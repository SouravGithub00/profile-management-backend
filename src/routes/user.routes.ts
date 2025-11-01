import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller";
import { authCheckXAPIMiddleware, authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me",authCheckXAPIMiddleware, authMiddleware, getProfile);
router.put("/updateme", authCheckXAPIMiddleware, authMiddleware, updateProfile);

export default router;
