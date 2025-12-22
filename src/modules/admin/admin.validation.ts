import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Invalid email format").trim(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(10, "Refresh token is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email format").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email format").trim(),
  otp: z.string().trim().length(6, "OTP must be 6 digits"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email format").trim().optional(),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
