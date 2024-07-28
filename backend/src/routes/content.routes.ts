import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Course, IContent, ITopic, IModule } from '../models/coursesModel';

const router = Router();

// Add Content to a Topic
router.post('/:courseId/:moduleId/:topicId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId } = req.params;
  const { topicname, videoUrl } = req.body;

  try {
    const course = await Course.findById(courseId).exec();
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as mongoose.Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as unknown as mongoose.Types.Subdocument & ITopic;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const newContent: IContent = {
      _id: new mongoose.Types.ObjectId(),
      topicname,
      videoUrl,
    } as IContent;

    topic.content.push(newContent as any);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get All Content of a Topic
router.get('/:courseId/:moduleId/:topicId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId } = req.params;

  try {
    const course = await Course.findById(courseId).exec();
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as mongoose.Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as unknown as mongoose.Types.Subdocument & ITopic;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    res.status(200).json(topic.content);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Update Content of a Topic
router.put('/:courseId/:moduleId/:topicId/:contentId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId, contentId } = req.params;
  const { topicname, videoUrl } = req.body;

  try {
    const course = await Course.findById(courseId).exec();
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as mongoose.Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as unknown as mongoose.Types.Subdocument & ITopic;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const content = topic.content.id(contentId) as unknown as mongoose.Types.Subdocument & IContent & any[];
    if (!content) return res.status(404).json({ error: 'Content not found' });

    content.topicname = topicname;
    content.videoUrl = videoUrl;
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete Content of a Topic
router.delete('/:courseId/:moduleId/:topicId/:contentId', async (req: Request, res: Response) => {
  const { courseId, moduleId, topicId, contentId } = req.params;

  try {
    const course = await Course.findById(courseId).exec();
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const module = course.modules.id(moduleId) as mongoose.Types.Subdocument & IModule;
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const topic = module.topics.id(topicId) as unknown as mongoose.Types.Subdocument & ITopic;
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const content = topic.content.id(contentId) as unknown as mongoose.Types.Subdocument & IContent & any;
    if (!content) return res.status(404).json({ error: 'Content not found' });

    topic.content.pull(contentId); // Correct method to remove a subdocument using pull
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
