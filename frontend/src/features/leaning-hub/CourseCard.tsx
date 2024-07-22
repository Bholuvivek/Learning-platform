// src/components/CourseCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface CourseCardProps {
  id:string;
  title: string;
  imageUrl: string;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({id, title, imageUrl, onClick }) => {
  return (
    <Card key={id} onClick={onClick} sx={{ maxWidth: 345, margin: '20px', cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
