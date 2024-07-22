import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Module } from '../../types';
import { createModule, updateModule  } from '../../../services/api';

interface ModuleFormProps {
  courseId: string;
  module?: Module;
  onClose: () => void;
  onSuccess: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ courseId, module, onClose, onSuccess }) => {
  const [title, setTitle] = useState(module?.title || '');

  const handleSubmit = async () => {
    try {
      if (module) {
        await updateModule(courseId, module._id, { title });
      } else {
        await createModule(courseId, { title });
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting module form:', error);
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
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {module ? 'Update Module' : 'Create Module'}
      </Button>
      <Button onClick={onClose} variant="outlined" color="secondary">
        Cancel
      </Button>
    </Box>
  );
};

export default ModuleForm;
