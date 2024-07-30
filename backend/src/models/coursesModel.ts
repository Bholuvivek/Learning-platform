import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IContent {
  topicname: string;
  videoUrl: string;
  image?: string; // Optional field for image URL or image data
}

export interface ITopic {
  title: string;
  content: Types.DocumentArray<IContent>;
}

export interface IModule {
  title: string;
  topics: Types.DocumentArray<ITopic>;
}

export interface ICourse extends Document {
  title: string;
  modules: Types.DocumentArray<IModule>;
}

const ContentSchema = new Schema<IContent>({
  topicname: { type: String, required: true },
  videoUrl: { type: String, required: true },
  image: { type: String } // Added image field
});

const TopicSchema = new Schema<ITopic>({
  title: { type: String, required: true },
  content: { type: [ContentSchema], default: [] }
});

const ModuleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  topics: { type: [TopicSchema], default: [] }
});

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  modules: { type: [ModuleSchema], default: [] }
});

export const Course: Model<ICourse> = mongoose.model('Course', CourseSchema);
