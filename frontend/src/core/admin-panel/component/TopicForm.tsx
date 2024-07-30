import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface TopicFormProps {
  onSubmit: (topicData: any) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={3}>
      <TextField
        label="Topic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Topic</Button>
    </Box>
  );
};

export default TopicForm;
