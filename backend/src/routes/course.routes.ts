import { Router } from 'express';
import { Course } from '../models/coursesModel';

const router = Router();

// Add Course
router.post('/', async (req, res) => {
  const { title, image, imageUrl } = req.body;
  try {
    const newCourse = new Course({ title, image, imageUrl });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get All Courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get Single Course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update Course
router.put('/:id', async (req, res) => {
  const { title, image, imageUrl } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, image, imageUrl },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err});
  }
});

// Delete Course
router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err});
  }
});

export default router;
