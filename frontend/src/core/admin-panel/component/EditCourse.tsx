import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${courseId}`);
        setTitle(response.data.title);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/courses/${courseId}`, { title, imageUrl });
      alert('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Course Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update Course
        </Button>
      </form>
    </Box>
  );
};

export default EditCourse;
