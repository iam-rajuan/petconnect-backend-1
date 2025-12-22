import { Router } from "express";
import validate from "../../middlewares/validate.middleware";
import adminAuth from "./admin.middleware";
import * as adminController from "./admin.controller";
import {
  adminLoginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "./admin.validation";

const router = Router();

router.post("/auth/login", validate(adminLoginSchema), adminController.login);
router.post("/auth/refresh", validate(refreshTokenSchema), adminController.refresh);
router.post("/auth/logout", validate(refreshTokenSchema), adminController.logout);
router.post("/auth/forgot-password", validate(forgotPasswordSchema), adminController.forgotPassword);
router.post("/auth/reset-password", validate(resetPasswordSchema), adminController.resetPassword);

router.get("/profile", adminAuth, adminController.getProfile);
router.patch(
  "/profile",
  adminAuth,
  validate(updateProfileSchema),
  adminController.updateProfile
);

export default router;
