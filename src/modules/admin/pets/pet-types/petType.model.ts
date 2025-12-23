import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPetType extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const petTypeSchema = new Schema<IPetType>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

const PetType: Model<IPetType> = mongoose.model<IPetType>("PetType", petTypeSchema);

export default PetType;
