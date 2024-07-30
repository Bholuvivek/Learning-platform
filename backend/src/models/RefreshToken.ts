import { Schema, model, Document } from 'mongoose';

interface IRefreshToken extends Document {
  token: string;
  user: Schema.Types.ObjectId;
  expiryDate: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiryDate: { type: Date, required: true }
});

export const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema);
