
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Button } from '@mui/material';
import { useStore } from '../../../store/index';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogs = useStore().auth.blogs();
  const blog = blogs.find(blog => blog.id === Number(id));

  if (!blog) {
    return <Typography variant="h6">Blog not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3">{blog.title}</Typography>
      <Typography variant="body1">{blog.content}</Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>Back</Button>
    </Container>
  );
};

export default BlogDetail;
