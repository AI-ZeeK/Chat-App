import { Router } from "express";
import { SignUp } from "../controllers/authController.js";
const router = Router();
router.post("/signup", SignUp);
export default router;
