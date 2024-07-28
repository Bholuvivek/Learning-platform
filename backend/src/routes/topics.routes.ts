import { Router, Request, Response } from 'express';
import { Course, ICourse, IModule, ITopic } from '../models/coursesModel';
import mongoose, { Types } from 'mongoose';

const router = Router();

// Add Topic to a Module
router.post('/:courseId/:moduleId', async (req: Request, res: Response) => {
  const { courseId, moduleId } = req.params;
  const { title } = req.body;
  try {
    const course = await Course.findById(courseId) as ICourse;
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const newTopic: Partial<ITopic | any> = { title, content: []};
    module.topics.push(newTopic as ITopic);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get All Topics of a Module
router.get('/:courseId/:moduleId', async (req: Request, res: Response) => {
  const { courseId, moduleId } = req.params;
  try {
    const course = await Course.findById(courseId) as ICourse;
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    res.status(200).json(module.topics);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Update Topic of a Module
router.put('/:courseId/:moduleId/:topicId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId } = req.params;
  const { title } = req.body;
  try {
    const course = await Course.findById(courseId) as ICourse;
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as Types.Subdocument & ITopic;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    topic.title = title;
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete Topic of a Module
router.delete('/:courseId/:moduleId/:topicId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId } = req.params;
  try {
    const course = await Course.findById(courseId) as ICourse;
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as unknown as mongoose.Document | any;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    await topic.remove();
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
