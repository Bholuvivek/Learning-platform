import React from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const ArticleDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1561295272.1694592742&semt=ais_user'}
          alt='vivek'
          sx={{ mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1">{blog.createdBy} </Typography>
          <Typography variant="caption">{moment(blog.createdAt).fromNow()}</Typography>
        </Box>
      </Box>
      <Typography variant="h3">{blog.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>{blog.description}</Typography>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </Container>
  );
};

export default ArticleDetails;
