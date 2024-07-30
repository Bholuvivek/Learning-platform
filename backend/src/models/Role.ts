import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
  name: string;
  rights: string[];
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  rights: [{ type: String }]
});

export const Role = model<IRole>('Role', roleSchema);
