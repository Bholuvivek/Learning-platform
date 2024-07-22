import express, { Request, Response } from 'express';
import ModuleModel from '../models/moduleModel';
import VideoModel from '../models/videoModel';

const router = express.Router();

// Create a new module
router.post('/newModule', async (req: Request, res: Response) => {
  try {
    const module = new ModuleModel(req.body);
    await module.save();
    res.status(201).json({ status: 'Module created', module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create module' });
  }
});

// Add videos to a module
router.post('/:id/videos', async (req: Request, res: Response) => {
  try {
    const module = await ModuleModel.findById(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module not found' });

    const videos = req.body; // Expecting an array of videos
    const savedVideos = await VideoModel.insertMany(videos);

    module.videos.push(...savedVideos.map(video => video._id));
    await module.save();

    res.status(201).json({ status: 'Videos added', module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add videos' });
  }
});

// Get all modules
router.get('/', async (req: Request, res: Response) => {
  try {
    const modules = await ModuleModel.find().populate('videos');
    res.status(200).json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve modules' });
  }
});

// Get a single module by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const module = await ModuleModel.findById(req.params.id).populate('videos');
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.status(200).json(module);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve module' });
  }
});

// Update a module by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const module = await ModuleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.status(200).json({ status: 'Module updated', module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update module' });
  }
});

// Delete a module by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const module = await ModuleModel.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module not found' });

    // Optionally, delete all videos associated with the module
    await VideoModel.deleteMany({ _id: { $in: module.videos } });

    res.status(200).json({ status: 'Module deleted', module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete module' });
  }
});

export default router;
