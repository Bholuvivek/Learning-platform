import mongoose, { Schema, Document } from 'mongoose';
import { VideoSchema, Video } from './video';

export interface Module extends Document {
    // id: number;
    title: string;
    videos: Video[];
}

export const ModuleSchema: Schema = new Schema({
    // id: { type: Number, required: true },
    title: { type: String, required: true },
    videos: { type: [VideoSchema], required: true }
});

const ModuleModel = mongoose.model<Module>('Module', ModuleSchema);
export default ModuleModel;
