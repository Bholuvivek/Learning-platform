import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { actions, useStore } from '../../../store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const Blog: React.FC = () => {
  const blogs = useStore().auth.blogs();
  const  removeBlog =actions.auth.removeBlog
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    // Initial load of blogs from store
  }, [blogs]);

  const handleAddPost = () => {
    const timestamp = new Date().toISOString();
    if (editMode && currentId !== null) {
      actions.auth.updateBlog({
        id: currentId, title, content, image, createdAt: timestamp, likes: 0,
        author: {
          username: '',
          avatar: undefined
        }
      });
      setEditMode(false);
      setCurrentId(null);
    } else {
      actions.auth.addBlog({
        id: Date.now(), title, content, image, createdAt: timestamp, likes: 0,
        author: {
          username: '',
          avatar: undefined
        }
      });
    }
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleEditPost = (id: number) => {
    const post = blogs.find(post => post.id === id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      setEditMode(true);
      setCurrentId(id);
    }
  };

  const handleDeletePost = (id: number) => {
    removeBlog(id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'direction', 'align',
    'link', 'image', 'video', 'color', 'background', 'code-block'
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Blog</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: '300px', marginBottom: '2rem' }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {image && (
          <Typography variant="body2" sx={{ mb: 2 }}>{image}</Typography>
        )}
        <Button variant="contained" onClick={handleAddPost}>
          {editMode ? 'Update Post' : 'Add Post'}
        </Button>
      </Box>
      {blogs.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.image && (
              <Box
                component="img"
                src={post.image}
                alt="Post"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mt: 2,
                  maxHeight: '400px',
                  objectFit: 'cover'
                }}
              />
            )}
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleEditPost(post.id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeletePost(post.id)}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Blog;
