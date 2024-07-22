import { Router, Request, Response } from 'express';
import CourseModel from '../models/course';

const router: Router = Router();

// Get all courses
router.get('/', async (req: Request, res: Response) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Get a specific course by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;
        const course = await CourseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch course' });
    }
});

// Create a new course
router.post('/newCourse', async (req: Request, res: Response) => {
    try {
        const newCourse = new CourseModel(req.body);
        await newCourse.save();
        res.status(201).json({ status: 'Course saved', course: newCourse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save course' });
    }
});

// Update a course by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, req.body, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ status: 'Course updated', course: updatedCourse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update course' });
    }
});

// Delete a course by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;
        const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ status: 'Course deleted', course: deletedCourse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete course' });
    }
});

export default router;
