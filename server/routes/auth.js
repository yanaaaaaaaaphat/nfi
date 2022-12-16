import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { protect } from "../middlewares/protect.js";

const authRouter = Router();

// authRouter.use(protect);
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;