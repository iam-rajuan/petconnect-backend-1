import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email format").trim().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
