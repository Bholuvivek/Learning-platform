import express, { Request, Response } from 'express';
import CourseModel from '../models/courseModel';

const router = express.Router();

// Create a new course
router.post('/newCourse', async (req: Request, res: Response) => {
  try {
    const course = new CourseModel(req.body);
    await course.save();
    res.status(201).json({ status: 'Course created', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await CourseModel.find().populate('modules');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
});

// Get a single course by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate('modules');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve course' });
  }
});

// Update a course by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ status: 'Course updated', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete a course by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ status: 'Course deleted', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
