import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      <Typography variant="h2" style={{ marginBottom: '20px' }}>
        Welcome to Baby Transforming Learning
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '40px' }}>
        Empowering educators and students with innovative digital solutions for a brighter future.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <img
            src="https://th.bing.com/th/id/OIP.oFKlo-6Uvp-baGUMK-q78QHaEK?rs=1&pid=ImgDetMain"
            alt="Learning Management System"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              marginBottom: '20px',
              objectFit: 'cover'
            }}
          />
          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            Learning Management System
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            Centralize your educational resources and track student progress seamlessly.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://th.bing.com/th/id/R.7bf48ef42f4ff1cef6cdcec51cfc19f5?rik=EzKwm9TvGn7sPQ&riu=http%3a%2f%2fxlntgroup.net%2fwp-content%2fuploads%2f2017%2f08%2fVIDEO-CONFERENCING.jpg&ehk=7u%2bvxgKHQaPgrl8AVIKO1gNxDBaEuTi3j%2bbJCvXI%2ffI%3d&risl=&pid=ImgRaw&r=0"
            alt="Video Conferencing"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              marginBottom: '20px'
            }}
          />
          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            Video Conferencing
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            Engage with students in real-time through interactive video sessions.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://img.freepik.com/premium-vector/teacher-prepares-respond-during-online-geometry-lesson-school-internet-man-chemical-outfit-with-red-barrel-hands-monitor-with-video-about-statistics-background_273625-5286.jpg?size=626&ext=jpg&ga=GA1.1.1561295272.1694592742&semt=ais_user"
            alt="Analytics"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              marginBottom: '20px'
            }}
          />
          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            Educational Analytics
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            Use data-driven insights to enhance teaching methods and student outcomes.
          </Typography>
        </Grid>
      </Grid>
      <Link to={'/sign-up'} style={{textDecoration:'none'}}>
        <Button variant="contained" color="primary" style={{ marginTop: '40px' }}>
          Join Now
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;
