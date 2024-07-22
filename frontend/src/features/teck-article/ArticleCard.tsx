import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Avatar, Box } from '@mui/material';
import { ThumbUp, Comment, Share, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface ArticleCardProps {
  id: number;
  title: string;
  type: string;
  createdBy: string;
  description: string;
  createdAt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, type, createdBy, description, createdAt }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/article/${id}`, { state: { id, title, type, createdBy, description, createdAt } });
  };

  return (
    <Card sx={{ cursor: 'pointer', maxHeight: '17rem' }} onClick={handleClick}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1561295272.1694592742&semt=ais_user'}
            alt='vivek'
            sx={{ mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">{createdBy}</Typography>
            <Typography variant="caption">{moment(createdAt).fromNow()}</Typography>
          </Box>
        </Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ maxHeight: '4rem', overflow: 'hidden' }}>{description.substring(0, 20)}...</Typography>
      </CardContent>
      <CardActions>
        <IconButton><ThumbUp /></IconButton>
        <IconButton><Comment /></IconButton>
        <IconButton><Share /></IconButton>
        <IconButton><Edit /></IconButton>
        <IconButton><Delete /></IconButton>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
    