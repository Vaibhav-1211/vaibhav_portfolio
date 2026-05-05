import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  cgpa: string;
  startYear: string;
  endYear: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    cgpa: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IEducation>('Education', EducationSchema);
