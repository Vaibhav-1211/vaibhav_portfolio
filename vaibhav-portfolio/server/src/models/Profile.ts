import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  summary: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String },
    summary: { type: String, required: true },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);
