import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRouter from './routes/course.routes';
// import moduleRouter from './routes/module.routes';
// import videoRouter from './routes/video.routes';
import { Course, IModule, ITopic, IContent } from './models/coursesModel';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));


// app.use('/api/v1/courses', courseRouter);
// app.use('/api/v1/modules', moduleRouter);
// app.use('/api/v1', videoRouter);

// Routes
import courseRoutes from './routes/course.routes';
import moduleRoutes from './routes/modules.routes';
import topicRoutes from './routes/topics.routes';
import contentRoutes from './routes/content.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

export { app };


// http://localhost:8000/api/v1/auth/register for new user
