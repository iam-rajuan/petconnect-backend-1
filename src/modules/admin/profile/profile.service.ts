import Admin from "../auth/admin.model";
import { UpdateProfileInput } from "./profile.validation";

export interface AdminProfile {
  id: string;
  name: string;
  email?: string;
}

const requireAdmin = async (adminId: string) => {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new Error("Admin not found");
  }
  return admin;
};

export const getProfile = async (adminId: string): Promise<AdminProfile> => {
  const admin = await requireAdmin(adminId);
  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
  };
};

export const updateProfile = async (
  adminId: string,
  payload: UpdateProfileInput
): Promise<AdminProfile> => {
  const admin = await requireAdmin(adminId);

  if (payload.name) {
    admin.name = payload.name.trim();
  }

  if (payload.email) {
    const normalizedEmail = payload.email.trim().toLowerCase();
    if (normalizedEmail !== admin.email) {
      const existing = await Admin.findOne({ email: normalizedEmail, _id: { $ne: adminId } });
      if (existing) {
        throw new Error("Email already in use");
      }
      admin.email = normalizedEmail;
    }
  }

  await admin.save();

  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
  };
};
