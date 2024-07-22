import React, { useState } from 'react';
import { Box, Card, Container, Grid, Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const initialUserData = {
  fname: 'Vivek',
  lname: 'Singh',
  photo: 'https://img.freepik.com/free-vector/handsome-man_1308-85984.jpg?size=626&ext=jpg',
  email: 'vivek@gmail.com',
  mobile: '+91880472876',
  dob: '30/12/2001',
  doj: '15/05/2024',
  status: 'Active'
};

const UserProfile = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditable, setIsEditable] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <img
              style={{
                width: '90px',
                height: '90px',
                border: '5px solid #231910',
                borderRadius: '50%',
                display: 'block',
                margin: '0 auto'
              }}
              src={userData.photo}
              alt="profile"
            />
            {isEditable && (
              <Box mt={2}>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                  id="profile-photo-upload"
                />
                <label htmlFor="profile-photo-upload">
                  <Button variant="contained" component="span">
                    Upload Photo
                  </Button>
                </label>
              </Box>
            )}
            <Typography variant="h6">{userData.fname} {userData.lname}</Typography>
            <Typography>{userData.mobile}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between">
              <Stack spacing={1} mr={1}>
                <Typography>First Name:</Typography>
                <TextField
                  name="fname"
                  disabled={!isEditable}
                  value={userData.fname}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1} ml={1}>
                <Typography>Last Name:</Typography>
                <TextField
                  name="lname"
                  disabled={!isEditable}
                  value={userData.lname}
                  onChange={handleInputChange}
                />
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Date of Birth:</Typography>
                <TextField
                  name="dob"
                  size="small"
                  disabled={!isEditable}
                  value={userData.dob}
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Date of Join:</Typography>
                <TextField
                  name="doj"
                  size="small"
                  disabled={!isEditable}
                  value={userData.doj}
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Status:</Typography>
                <TextField
                  name="status"
                  size="small"
                  disabled={!isEditable}
                  value={userData.status}
                  onChange={handleInputChange}
                />
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <IconButton onClick={toggleEdit} color={isEditable ? "primary" : "default"}>
              {isEditable ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
