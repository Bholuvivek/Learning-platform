import mongoose, { Schema, Document } from 'mongoose';
import ModuleModel from './moduleModel'; // Import ModuleModel

interface ICourse extends Document {
  title: string;
  imageUrl: string;
  modules: mongoose.Types.ObjectId[];
}

const courseSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }]
});

const CourseModel = mongoose.model<ICourse>('Course', courseSchema);

export default CourseModel;
