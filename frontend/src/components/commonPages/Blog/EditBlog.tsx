// components/EditBlog.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { actions, useStore } from '../../../store/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const  blogs  = useStore().auth.blogs();
  const updateBlog = actions.auth.updateBlog;
  const blog = blogs.find(blog => blog.id === Number(id));

  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!blog) {
      navigate('/');
    }
  }, [blog, navigate]);

  const handleUpdate = () => {
    if (blog) {
      updateBlog({ ...blog, title, content, image: image ? URL.createObjectURL(image) : blog.image });
      navigate(`/blog/${id}`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Edit Blog</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />
      <Button variant="contained" component="label" style={{ marginTop: '1rem' }}>
        {image ? 'Change Image' : 'Upload Image'}
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      {image && <Typography variant="body2">{image.name}</Typography>}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </Container>
  );
};

export default EditBlog;
