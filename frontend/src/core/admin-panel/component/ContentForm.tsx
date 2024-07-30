import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ContentFormProps {
  onSubmit: (contentData: any) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit }) => {
  const [topicname, setTopicname] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ topicname, videoUrl });
    setTopicname('');
    setVideoUrl('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={3}>
      <TextField
        label="Content Title"
        value={topicname}
        onChange={(e) => setTopicname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Content</Button>
    </Box>
  );
};

export default ContentForm;
