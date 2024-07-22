import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditModule: React.FC = () => {
  const { courseId, moduleId } = useParams<{ courseId: string, moduleId: string }>();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${courseId}/modules/${moduleId}`);
        setTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    fetchModule();
  }, [courseId, moduleId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/courses/${courseId}/modules/${moduleId}`, { title });
      alert('Module updated successfully!');
    } catch (error) {
      console.error('Error updating module:', error);
      alert('Failed to update module.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Module
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Module Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update Module
        </Button>
      </form>
    </Box>
  );
};

export default EditModule;
