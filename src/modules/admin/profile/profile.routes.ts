import { Router } from "express";
import validate from "../../../middlewares/validate.middleware";
import adminAuth from "../auth/admin.middleware";
import * as profileController from "./profile.controller";
import { updateProfileSchema } from "./profile.validation";

const router = Router();

router.get("/", adminAuth, profileController.getProfile);
router.patch("/", adminAuth, validate(updateProfileSchema), profileController.updateProfile);

export default router;
