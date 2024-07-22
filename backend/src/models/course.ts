// src/models/course.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the Video interface
interface Video {
  title: string;
  url: string;
}

// Define the Module interface
interface Module {
  _id: Types.ObjectId;
  title: string;
  videos: Video[];
}

// Define the Course interface
interface Course extends Document {
  title: string;
  imageUrl: string;
  modules: Types.DocumentArray<Module>;
}

// Define the schema for the Course model
const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});

const ModuleSchema: Schema = new Schema({
  title: { type: String, required: true },
  videos: [VideoSchema]
});

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  modules: [ModuleSchema]
});

const CourseModel = mongoose.model<Course>('Course', CourseSchema);

export default CourseModel;
