import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Grid, Avatar, Box } from '@mui/material';
import { ThumbUp, Comment, Share, Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/index';
import { authStore } from '../../../store/authStrore';
import moment from 'moment';

const BlogCard: React.FC = () => {
  const navigate = useNavigate();
  const blogs = useStore().auth.blogs();
  const isLogged:boolean = useStore().auth.isLogged();
  const removeBlog = authStore.set.removeBlog;
  const updateBlog = authStore.set.updateBlog;
  const handleReadMore = (id: number) => {
    navigate(`/app/blog/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-blog/${id}`);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBlog(id);
  };

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBlog = blogs.find(blog => blog.id === id);
    if (updatedBlog) {
      updateBlog({ ...updatedBlog, likes: (updatedBlog.likes || 0) + 1 });
    }
  };

  const handleComment = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic for commenting (can be implemented as needed)
  };

  const handleShare = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic for sharing (can be implemented as needed)
  };

  return (
    <>
      {isLogged ? <Link to={'/app/add-blog'}>Add Blog</Link> : ''}
      <Grid container spacing={2} mt={2}>
        {blogs.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Card sx={{ cursor: 'pointer', maxHeight:'17rem' }} onClick={() => handleReadMore(blog.id)}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1561295272.1694592742&semt=ais_user'} alt='vivek' sx={{ mr: 2 }} />
                                    <Box>
                    <Typography variant="subtitle1">Vivek Bholu</Typography>
                    <Typography variant="caption">{moment(blog.createdAt).fromNow()}</Typography>
                  </Box>
                </Box>
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body2" sx={{maxHeight:'4rem', overflow:'hidden'}} dangerouslySetInnerHTML={{ __html: blog.content }} />
              </CardContent>
              <CardActions>
                <IconButton onClick={(e) => handleLike(blog.id, e)}><ThumbUp /></IconButton>
                <IconButton onClick={(e) => handleComment(blog.id, e)}><Comment /></IconButton>
                <IconButton onClick={(e) => handleShare(blog.id, e)}><Share /></IconButton>
                {isLogged && (
                  <>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(blog.id); }}><Edit /></IconButton>
                    <IconButton onClick={(e) => handleDelete(blog.id, e)}><Delete /></IconButton>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BlogCard;
