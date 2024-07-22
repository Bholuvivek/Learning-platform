import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddModule: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/v1/courses/${courseId}/modules`, { title });
      alert('Module added successfully!');
      setTitle('');
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Failed to add module.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Module
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
          Add Module
        </Button>
      </form>
    </Box>
  );
};

export default AddModule;
