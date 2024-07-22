import mongoose, { Schema, Document } from 'mongoose';

export interface Video extends Document {
    // id: number;
    title: string;
    url: string;
}

export const VideoSchema: Schema = new Schema({
    // id: { type: Number, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true }
});

const VideoModel = mongoose.model<Video>('Video', VideoSchema);
export default VideoModel;
