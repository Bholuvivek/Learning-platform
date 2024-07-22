import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Video {
  _id: string;
  title: string;
  url: string;
}

interface Module {
  _id: string;
  title: string;
  videos: Video[];
}

interface Course {
  _id: string;
  title: string;
  modules: Module[];
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get course ID from URL
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">{course.title}</Typography>
      {course.modules.map(module => (
        <Box key={module._id} mt={4}>
          <Typography variant="h5">{module.title}</Typography>
          <List>
            {module.videos.map(video => (
              <ListItem key={video._id}>
                <ListItemText primary={video.title} />
                <ReactPlayer url={video.url} controls />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default CourseDetails;
