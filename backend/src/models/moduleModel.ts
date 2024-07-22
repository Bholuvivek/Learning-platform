import mongoose, { Schema, Document } from 'mongoose';
import VideoModel from './videoModel'; // Import VideoModel

interface IModule extends Document {
  title: string;
  videos: mongoose.Types.ObjectId[]; // Array of video references
}

const moduleSchema: Schema = new Schema({
  title: { type: String, required: true },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }] // Reference to videos
});

const ModuleModel = mongoose.model<IModule>('Module', moduleSchema);

export default ModuleModel;
