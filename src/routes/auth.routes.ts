import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { authCheckXAPIMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", authCheckXAPIMiddleware, login);
router.post("/register", authCheckXAPIMiddleware, register); 

export default router;
