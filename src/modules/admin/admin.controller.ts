import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as adminService from "./admin.service";
import {
  AdminLoginInput,
  RefreshTokenInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdateProfileInput,
} from "./admin.validation";

export const login = async (
  req: AuthRequest & { body: AdminLoginInput },
  res: Response
) => {
  try {
    const { user, tokens } = await adminService.login(req.body);
    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "admin",
        },
        tokens,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    res.status(400).json({ success: false, message });
  }
};

export const refresh = async (
  req: AuthRequest & { body: RefreshTokenInput },
  res: Response
) => {
  try {
    const tokens = await adminService.refreshTokens(req.body);
    res.json({ success: true, message: "Tokens refreshed", data: tokens });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Refresh failed";
    res.status(400).json({ success: false, message });
  }
};

export const logout = async (
  req: AuthRequest & { body: RefreshTokenInput },
  res: Response
) => {
  try {
    await adminService.logout(req.body);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Logout failed";
    res.status(400).json({ success: false, message });
  }
};

export const forgotPassword = async (
  req: AuthRequest & { body: ForgotPasswordInput },
  res: Response
) => {
  try {
    await adminService.forgotPassword(req.body);
    res.json({
      success: true,
      message: "If this email exists, an OTP has been sent",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    res.status(400).json({ success: false, message });
  }
};

export const resetPassword = async (
  req: AuthRequest & { body: ResetPasswordInput },
  res: Response
) => {
  try {
    await adminService.resetPassword(req.body);
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Reset failed";
    res.status(400).json({ success: false, message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const profile = await adminService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch profile";
    res.status(400).json({ success: false, message });
  }
};

export const updateProfile = async (
  req: AuthRequest & { body: UpdateProfileInput },
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const profile = await adminService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: "Profile updated", data: profile });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update profile";
    res.status(400).json({ success: false, message });
  }
};
