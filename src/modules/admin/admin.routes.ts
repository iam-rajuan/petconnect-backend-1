import { Router, Request, Response, NextFunction } from "express";
import validate from "../../middlewares/validate.middleware";
import auth from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import {
  paginationSchema,
  userIdParamSchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
} from "./admin.validators";
import * as adminController from "./admin.controller";
import { ZodError, ZodSchema } from "zod";

const router = Router();

const validateQuery =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed as typeof req.query;
      next();
    } catch (err) {
      const isZodError = err instanceof ZodError;
      return res.status(400).json({
        success: false,
        message: isZodError
          ? err.issues?.[0]?.message || "Validation failed"
          : "Validation failed",
        issues: isZodError ? err.issues : err,
      });
    }
  };

const validateParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.params);
      req.params = parsed as typeof req.params;
      next();
    } catch (err) {
      const isZodError = err instanceof ZodError;
      return res.status(400).json({
        success: false,
        message: isZodError
          ? err.issues?.[0]?.message || "Validation failed"
          : "Validation failed",
        issues: isZodError ? err.issues : err,
      });
    }
  };

router.use(auth, requireRole("admin"));

router.get("/users", adminController.listUsers);
// router.get("/users", validateQuery(paginationSchema), adminController.listUsers);
router.get("/users/:id", validateParams(userIdParamSchema), adminController.getUser);
router.patch(
  "/users/:id/status",
  validateParams(userIdParamSchema),
  validate(updateUserStatusSchema),
  adminController.updateUserStatus
);
router.patch(
  "/users/:id/role",
  validateParams(userIdParamSchema),
  validate(updateUserRoleSchema),
  adminController.updateUserRole
);
router.patch(
  "/users/:id/suspend",
  validateParams(userIdParamSchema),
  adminController.suspendUser
);
router.patch(
  "/users/:id/unsuspend",
  validateParams(userIdParamSchema),
  adminController.unsuspendUser
);

export default router;
