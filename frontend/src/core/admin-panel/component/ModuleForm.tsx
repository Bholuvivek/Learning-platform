import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ModuleFormProps {
  onSubmit: (moduleData: any) => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={3}>
      <TextField
        label="Module Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Module</Button>
    </Box>
  );
};

export default ModuleForm;
