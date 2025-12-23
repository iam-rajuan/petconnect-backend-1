import { Router } from "express";
import authRouter from "./auth/auth.routes";
import profileRouter from "./profile/profile.routes";
import petRouter from "./pets/pet.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/", petRouter);

const adminModule = { name: "admin", basePath: "/admin", router };

export default adminModule;
