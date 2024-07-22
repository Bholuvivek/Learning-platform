import express, { Request, Response } from 'express';
import VideoModel from '../models/videoModel';

const router = express.Router();

// Create a new video
router.post('/newVideo', async (req: Request, res: Response) => {
  try {
    const video = new VideoModel(req.body);
    await video.save();
    res.status(201).json({ status: 'Video created', video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// Get all videos
router.get('/', async (req: Request, res: Response) => {
  try {
    const videos = await VideoModel.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve videos' });
    }
    });
    
    // Get a single video by ID
    router.get('/', async (req: Request, res: Response) => {
    try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve video' });
    }
    });
    
    // Update a video by ID
    router.put('/ ', async (req: Request, res: Response) => {
    try {
    const video = await VideoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json({ status: 'Video updated', video });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update video' });
    }
    });
    
    // Delete a video by ID
    router.delete('/', async (req: Request, res: Response) => {
    try {
    const video = await VideoModel.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json({ status: 'Video deleted', video });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete video' });
    }
    });
    
    export default router;
    
    
