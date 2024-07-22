import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRouter from './routes/course.routes';
import moduleRouter from './routes/module.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/modules', moduleRouter);

export { app };
