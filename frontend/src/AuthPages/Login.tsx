import { ChangeEvent, FormEvent, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Card, Box } from "@mui/material";
import { actions } from '../store/index';

const style = {
  marginRight:'10px',
  fontSize:'15px'
}

interface FormData{
  username:string;
  password:string
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = (e:FormEvent<HTMLElement>) => {
    e.preventDefault();

    const staticUsername:string = "superadmin";
    const staticPassword:string = "Admin@123";
    const data = formData
    if (data) {
        if (data.username === staticUsername && data.password ===staticPassword) {
          actions.auth.setTokens(data.username, data.password,);
           navigate('/app/home');
        }
        else{
          alert('Please Enter Correct UserName and Password')
        }
     
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    
    <Container maxWidth="xs" sx={{bgcolor:'#FFF', py:3, alignSelf:'center', mt:12, borderRadius:2}}>
      <Card sx={{p:3, bgcolor:'#FEF3F5', boxShadow:'none'}} >
        <Typography sx={{bgcolor:'#393939', color:'#FFF'}} variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          
          sx={{ mt: 2,
            border:'2px, solid primary',
            ':hover':{
              bgcolor:'#00e676',
              color:'#292929'
            }
           }}

        >
          Submit
        </Button>

        <Box my={2}>
          <span style={style}>Create Account If you are New Here</span>
          <Link style={{fontSize:'18px', color:'blue'}} to={'/sign-up'}>SignUp</Link>
        </Box>
      </form>
      </Card>
    </Container>
  );
};

export default Login;
