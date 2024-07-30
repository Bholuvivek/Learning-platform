
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface CourseFormProps {
  onSubmit: (courseData: any) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={3}>
      <TextField
        label="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Course</Button>
    </Box>
  );
};

export default CourseForm;
