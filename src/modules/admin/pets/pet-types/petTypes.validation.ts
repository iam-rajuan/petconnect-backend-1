import { z } from "zod";

export const petTypeIdParamSchema = z.object({
  id: z.string().trim().min(1, "Pet type id is required"),
});

export const createPetTypeSchema = z.object({
  name: z.string().trim().min(2, "Pet type name is required").max(30, "Max 30 characters"),
});

export const updatePetTypeSchema = z.object({
  name: z.string().trim().min(2, "Pet type name is required").max(30, "Max 30 characters"),
});

export type CreatePetTypeInput = z.infer<typeof createPetTypeSchema>;
export type UpdatePetTypeInput = z.infer<typeof updatePetTypeSchema>;
export type PetTypeIdParam = z.infer<typeof petTypeIdParamSchema>;
