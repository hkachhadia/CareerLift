import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  providerId: string;
  provider: 'google' | 'github';
  name: string;
  email: string;
  avatar?: string;
  targetRole?: string;
  targetCompany?: string;
}

const userSchema = new Schema<IUser>(
  {
    providerId: { type: String, required: true },
    provider: { type: String, required: true, enum: ['google', 'github'] },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    targetRole: { type: String },
    targetCompany: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
