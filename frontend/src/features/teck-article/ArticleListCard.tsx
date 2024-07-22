import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import blogData from './aricleData.json';
import ArticleCard from './ArticleCard';

const ArticleListCard: React.FC = () => {
  const navigate = useNavigate();

  const handleReadMore = (id: number) => {
    navigate(`/app/article/${id}`, { state: blogData.find(blog => blog.id === id) });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {blogData.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <ArticleCard
              id={blog.id!}
              title={blog.title}
              type={blog.type}
              createdBy={blog.createdBy.name}
              description={blog.description}
              createdAt={blog.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArticleListCard;
