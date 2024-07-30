import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: Date;
  profilePhoto?: string;
  roles: string[]; // Adjust based on your actual roles field type
  password: string; // Add password field
  otp?: string;
  otpExpires?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  profilePhoto: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // Adjust based on your actual roles field type
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date }
});

export const User = mongoose.model<IUser>('User', userSchema);
