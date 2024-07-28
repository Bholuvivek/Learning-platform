import { Router } from 'express';
import { Course, IModule } from '../models/coursesModel';

const router = Router();

// Add Module to a Course
router.post('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const newModule = { title, topics: [] } as unknown as IModule;
    course.modules.push(newModule);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get All Modules of a Course
router.get('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    res.status(200).json(course.modules);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Update Module of a Course
router.put('/:courseId/:moduleId', async (req, res) => {
  const { courseId, moduleId } = req.params;
  const { title } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });

    module.title = title;
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete Module of a Course
router.delete('/:courseId/:moduleId', async (req, res) => {
  const { courseId, moduleId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const moduleIndex = course.modules.findIndex((mod) => mod.id.toString() === moduleId);
    if (moduleIndex === -1) return res.status(404).json({ error: 'Module not found' });

    course.modules.splice(moduleIndex, 1);
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
