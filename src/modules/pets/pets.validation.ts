import { z } from "zod";

export const createPetSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  species: z.string().trim().min(2, "Species must be at least 2 characters"),
  breed: z.string().trim().optional(),
  age: z.number().min(0, "Age must be zero or positive").optional(),
  gender: z.enum(["male", "female"]).optional(),
  bio: z.string().trim().optional(),
});

export const updatePetSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
  species: z.string().trim().min(2, "Species must be at least 2 characters").optional(),
  breed: z.string().trim().optional(),
  age: z.number().min(0, "Age must be zero or positive").optional(),
  gender: z.enum(["male", "female"]).optional(),
  bio: z.string().trim().optional(),
});

export const petIdParamSchema = z.object({
  id: z.string().trim().min(1, "Pet id is required"),
});

export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>;
export type PetIdParam = z.infer<typeof petIdParamSchema>;
