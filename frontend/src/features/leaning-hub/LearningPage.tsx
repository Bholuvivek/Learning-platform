import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Paper, Divider, Grid, Accordion, AccordionSummary, AccordionDetails, Button, IconButton, Tooltip } from '@mui/material';
import ReactPlayer from 'react-player';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import GetAppIcon from '@mui/icons-material/GetApp';
import SpeedIcon from '@mui/icons-material/Speed';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Content {
  _id: string;
  topicname: string;
  videoUrl: string;
}

interface Topic {
  _id: string;
  title: string;
  content: Content[];
}

interface Module {
  _id: string;
  title: string;
  topics: Topic[];
}

interface Course {
  _id: string;
  title: string;
  modules: Module[];
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get course ID from URL
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleVideoSelect = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setPlaying(true);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleFastForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds');
    }
  };

  const handlePlaybackRateChange = () => {
    setPlaybackRate((prevRate) => (prevRate === 1.0 ? 1.5 : prevRate === 1.5 ? 2.0 : 1.0));
  };

  const handleDownload = () => {
    if (selectedVideoUrl) {
      const link = document.createElement('a');
      link.href = selectedVideoUrl;
      link.download = selectedVideoUrl.split('/').pop() || 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>{course.title}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {selectedVideoUrl && (
            <Box sx={{ position: 'sticky', top: 0 }}>
              <ReactPlayer
                ref={playerRef}
                url={selectedVideoUrl}
                controls
                playing={playing}
                playbackRate={playbackRate}
                width="100%"
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Tooltip title="Play/Pause">
                  <IconButton onClick={handlePlayPause}>
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Rewind 10 seconds">
                  <IconButton onClick={handleRewind}>
                    <FastRewindIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fast Forward 10 seconds">
                  <IconButton onClick={handleFastForward}>
                    <FastForwardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Speed: ${playbackRate}x`}>
                  <IconButton onClick={handlePlaybackRateChange}>
                    <SpeedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Video">
                  <IconButton onClick={handleDownload}>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {course.modules.map(module => (
            <Paper key={module._id} elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h5" color="primary" gutterBottom>{module.title}</Typography>
              {module.topics.map(topic => (
                <Box key={topic._id} mb={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" color="secondary">{topic.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {topic.content.map(content => (
                          <React.Fragment key={content._id}>
                            <ListItem button onClick={() => handleVideoSelect(content.videoUrl)}>
                              <ListItemText primary={content.topicname} />
                            </ListItem>
                            <Divider />
                          </React.Fragment>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetails;
