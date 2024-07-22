import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import axios from 'axios';

const AddCourse: React.FC = () => {
    const theme = useTheme();

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/v1/courses/newCourse', { title, imageUrl });
      alert('Course added successfully!');
      setTitle('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Course
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
          Add Course
        </Button>
      </form>
    </Box>
  );
};

export default AddCourse;
