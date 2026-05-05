import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  category: string;
  items: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', SkillSchema);
