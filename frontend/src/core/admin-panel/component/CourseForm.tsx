// src/components/CourseForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Course } from '../../types';
import { createCourse,updateCourse } from '../../../services/api';
interface CourseFormProps {
  course?: Course;
  onClose: () => void;
  onSuccess: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onClose, onSuccess }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [imageUrl, setImageUrl] = useState(course?.imageUrl || '');

  const handleSubmit = async () => {
    try {
      if (course) {
        await updateCourse(course._id, { title, imageUrl });
      } else {
        await createCourse({ title, imageUrl });
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting course form:', error);
    }
  };

  return (
    <Box>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {course ? 'Update Course' : 'Create Course'}
      </Button>
      <Button onClick={onClose} variant="outlined" color="secondary">
        Cancel
      </Button>
    </Box>
  );
};

export default CourseForm;
