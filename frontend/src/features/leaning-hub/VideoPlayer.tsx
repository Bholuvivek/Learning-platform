// src/components/VideoPlayer.tsx
import React from 'react';
import { authStore } from '../../store/authStrore';
import { Box, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

const VideoPlayer: React.FC = () => {
  const { downloadedVideos } = authStore(state => ({
    downloadedVideos: state.downloadedVideos,
  }));

  return (
    <Box>
      <Typography variant="h4">Downloaded Videos</Typography>
      {Object.entries(downloadedVideos).map(([videoId, url]) => (
        <Box key={videoId} mt={2}>
          <Typography variant="h6">Video ID: {videoId}</Typography>
          <ReactPlayer url={url} controls />
        </Box>
      ))}
    </Box>
  );
};

export default VideoPlayer;
