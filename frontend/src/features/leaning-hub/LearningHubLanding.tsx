import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, useTheme } from '@mui/material';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  imageUrl: string;
}

const LearningHubLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (id: string) => {
    navigate(`/app/course/${id}`);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 500,
          color: theme.palette.primary.main,
          textAlign: 'center',
          my: 4,
          border: `1px solid ${theme.palette.info.light}`,
          borderRadius: 15,
          mx: { md: '17rem', lg: '17rem', xl: '17rem', sm: '4rem', xs: '3rem' },
          p: 1,
        }}
      >
        We are Providing
      </Typography>
      <Grid container spacing={2}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
            <CourseCard
              title={course.title}
              imageUrl={course.imageUrl}
              onClick={() => handleCourseClick(course._id)} id={course._id}            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LearningHubLanding;
