// src/routes/module.routes.ts
import express, { Request, Response } from 'express';
import Course from '../models/course';

const router = express.Router();

// Create a new module for a specific course
router.post('/newModule', async (req: Request, res: Response) => {
  try {
    const { courseId, title } = req.body;

    // Validate inputs
    if (!courseId || !title) {
      return res.status(400).json({ error: 'Course ID and title are required' });
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create a new module
    const newModule = {
      title,
      videos: [] // Initialize with an empty array
    };

    // Add the new module to the course's modules array
    course.modules.push(newModule);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create module' });
  }
});


router.post('/courses/:courseId/modules/:moduleId/videos', async (req: Request, res: Response) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, url } = req.body;

    // Validate inputs
    if (!title || !url) {
      return res.status(400).json({ error: 'Video title and URL are required' });
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find the module in the course
    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Add the video to the module
    module.videos.push({ title, url });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add video' });
  }
});
// Add a video to a specific module in a course
// router.post('/:courseId/modules/:moduleId/videos', async (req: Request, res: Response) => {
//   try {
//     const { courseId, moduleId } = req.params;
//     const { title, url } = req.body;

//     // Validate inputs
//     if (!title || !url) {
//       return res.status(400).json({ error: 'Video title and URL are required' });
//     }

//     // Find the course by ID
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     // Find the module in the course
//     const module = course.modules.id(new mongoose.Types.ObjectId(moduleId));
//     if (!module) {
//       return res.status(404).json({ error: 'Module not found' });
//     }

//     // Add the video to the module
//     module.videos.push({ title, url });
//     await course.save();

//     res.status(201).json(course);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add video' });
//   }
// });

export default router;
