import Pet, { IPet } from "./pets.model";
import { CreatePetInput, UpdatePetInput } from "./pets.validation";

const ensureOwnedPet = async (ownerId: string, petId: string): Promise<IPet> => {
  const pet = await Pet.findOne({ _id: petId, owner: ownerId });
  if (!pet) {
    throw new Error("Pet not found");
  }
  return pet;
};

export const createPet = async (ownerId: string, payload: CreatePetInput): Promise<IPet> => {
  const pet = await Pet.create({
    owner: ownerId,
    name: payload.name.trim(),
    species: payload.species.trim(),
    breed: payload.breed?.trim(),
    age: payload.age,
    gender: payload.gender,
    bio: payload.bio?.trim(),
  });
  return pet;
};

export const findPetsByOwner = async (ownerId: string): Promise<IPet[]> => {
  return Pet.find({ owner: ownerId }).sort({ createdAt: -1 });
};

export const findPetById = async (ownerId: string, petId: string): Promise<IPet> => {
  return ensureOwnedPet(ownerId, petId);
};

export const updatePet = async (
  ownerId: string,
  petId: string,
  payload: UpdatePetInput
): Promise<IPet> => {
  const pet = await ensureOwnedPet(ownerId, petId);

  if (payload.name !== undefined) pet.name = payload.name.trim();
  if (payload.species !== undefined) pet.species = payload.species.trim();
  if (payload.breed !== undefined) pet.breed = payload.breed.trim();
  if (payload.age !== undefined) pet.age = payload.age;
  if (payload.gender !== undefined) pet.gender = payload.gender;
  if (payload.bio !== undefined) pet.bio = payload.bio.trim();

  await pet.save();
  return pet;
};

export const deletePet = async (ownerId: string, petId: string): Promise<void> => {
  const pet = await ensureOwnedPet(ownerId, petId);
  await Pet.deleteOne({ _id: pet._id });
};
