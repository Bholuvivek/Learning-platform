import { Box, Card, Container, Grid, Stack, Typography, TextField } from '@mui/material';

const userData =
{
    fname: 'Vivek',
    lname: 'Singh',
    photo: 'https://img.freepik.com/free-vector/handsome-man_1308-85984.jpg?size=626&ext=jpg',
    email: 'vivek@gmail.com',
    mobile: +911236547890,
    dob: '30/12/2001',
    doj: '15/05/2024',
    status:'Active'
}


const UserProfile = () => {
    return (
        <div>
            <Container>
                <Grid spacing={3} sx={{ display: "flex" }}>
                    <Card sx={{ display: 'grid', width: '30%', textAlign: 'center', mx:2, py:2   }}>
                        <img style={{ width: '90px', height: '90px', border: '5px solid #231910', borderRadius: '50%', display: 'flex', justifyItems: 'center', justifySelf: 'center' }} src={userData.photo} alt="profile" />
                      <Typography>{userData.fname} {'  '}{userData.lname}</Typography>
                        <Typography>{userData.mobile}</Typography>
                    </Card>
                    <Card sx={{ display: 'grid', width: '30%', mx:2, p:3 }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Stack spacing={1} mr={1}>
                            <Typography>First Name: </Typography>
                            <TextField disabled value={userData.fname}/>
                            </Stack>
                            <Stack spacing={1} ml={1}>
                            <Typography>Last Name: </Typography>
                            <TextField disabled value={userData.lname}/>
                            </Stack>
                        </Box>
                        
                    </Card>
                    <Card sx={{ display: 'grid', width: '30%', mx:2 }}>
                       <Box display={'flex'}>
                       <Typography>Date of Birth: </Typography>
                       <TextField size='small' sx={{width:'7.5rem',float:'right'}} disabled value={userData.dob}/>
                       </Box>
                       <Box display={'flex'}>
                       <Typography>Date of Join: </Typography>
                       <TextField size='small' sx={{width:'7.5rem',float:'right'}} disabled value={userData.doj}/>
                       </Box>
                       <Box display={'flex'}>
                       <Typography>Status: </Typography>
                       <TextField size='small' sx={{width:'7.5rem', float:'right'}} disabled value={userData.status}/>
                       </Box>
                    </Card>
                </Grid>
            </Container>
        </div>
    )
}

export default UserProfile
