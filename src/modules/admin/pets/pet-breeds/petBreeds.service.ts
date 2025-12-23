import PetBreed, { IPetBreed } from "./petBreed.model";
import PetType from "../pet-types/petType.model";

const normalizeName = (name: string): { name: string; slug: string } => {
  const trimmed = name.trim();
  return { name: trimmed, slug: trimmed.toLowerCase() };
};

export const createPetBreed = async (typeId: string, name: string): Promise<IPetBreed> => {
  const petType = await PetType.findById(typeId);
  if (!petType) {
    throw new Error("Pet type not found");
  }

  const { name: normalized, slug } = normalizeName(name);
  const existing = await PetBreed.findOne({ slug, petType: petType._id });
  if (existing) {
    throw new Error("Pet breed already exists for this pet type");
  }

  return PetBreed.create({ name: normalized, slug, petType: petType._id });
};

export const listBreedsByType = async (typeId: string): Promise<IPetBreed[]> => {
  const petType = await PetType.findById(typeId);
  if (!petType) {
    throw new Error("Pet type not found");
  }

  return PetBreed.find({ petType: typeId }).sort({ name: 1 });
};

export const updatePetBreed = async (id: string, name: string): Promise<IPetBreed> => {
  const breed = await PetBreed.findById(id);
  if (!breed) {
    throw new Error("Pet breed not found");
  }

  const { name: normalized, slug } = normalizeName(name);
  if (slug !== breed.slug) {
    const existing = await PetBreed.findOne({
      slug,
      petType: breed.petType,
      _id: { $ne: id },
    });
    if (existing) {
      throw new Error("Pet breed already exists for this pet type");
    }
  }

  breed.name = normalized;
  breed.slug = slug;
  await breed.save();
  return breed;
};

export const deletePetBreed = async (id: string): Promise<void> => {
  const breed = await PetBreed.findById(id);
  if (!breed) {
    throw new Error("Pet breed not found");
  }
  await PetBreed.deleteOne({ _id: breed._id });
};
