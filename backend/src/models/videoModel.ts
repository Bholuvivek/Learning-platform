import mongoose, { Schema, Document } from 'mongoose';

interface IVideo extends Document {
  title: string;
  url: string;
}

const videoSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});

const VideoModel = mongoose.model<IVideo>('Video', videoSchema);

export default VideoModel;
