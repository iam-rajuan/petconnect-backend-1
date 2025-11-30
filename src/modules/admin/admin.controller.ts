import { Request, Response } from "express";
import * as adminService from "./admin.service";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query as { page?: number; limit?: number };
    const result = await adminService.listUsers(page, limit);
    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list users";
    res.status(400).json({ success: false, message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminService.getUserById(id);
    res.json({ success: true, data: user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch user";
    res.status(404).json({ success: false, message });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: "pending" | "active" | "rejected" };
    const user = await adminService.updateUserStatus(id, status);
    res.json({ success: true, data: user, message: "User status updated" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update status";
    res.status(400).json({ success: false, message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body as { role: "user" | "provider" | "admin" };
    const user = await adminService.updateUserRole(id, role);
    res.json({ success: true, data: user, message: "User role updated" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update role";
    res.status(400).json({ success: false, message });
  }
};

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminService.suspendUser(id);
    res.json({ success: true, data: user, message: "User suspended" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to suspend user";
    res.status(400).json({ success: false, message });
  }
};

export const unsuspendUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminService.unsuspendUser(id);
    res.json({ success: true, data: user, message: "User unsuspended" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to unsuspend user";
    res.status(400).json({ success: false, message });
  }
};
