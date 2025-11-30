import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1).optional,
  limit: z.coerce.number().int().min(1).max(100).default(10).optional,
});

export const userIdParamSchema = z.object({
  id: z.string().trim().min(1, "User id is required"),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["pending", "active", "rejected"], {
    message: "Status must be pending, active, or rejected",
  }),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["user", "provider", "admin"], {
    message: "Role must be user, provider, or admin",
  }),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
