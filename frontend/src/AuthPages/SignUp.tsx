import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { TextField, Button, Typography, Container, Card, CardActions, CardContent, Box} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

interface IFormInput {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  }
  
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    mobile: yup.string().required('Mobile number is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  const SignUp: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      console.log(data);
    };
  
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{ width: '100%', px: 12, mx:5, boxShadow: '2', bgcolor:'#F3F5FE'}}>
            <CardContent>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ mb: 1 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 1 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Mobile"
                  {...register('mobile')}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  sx={{ mb: 1}}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 1 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 1 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Sign Up
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => reset()}
                  
                >
                  Reset
                </Button>
              </form>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Box sx={{mb:2}}>
             Already have an account?
              <Link to="/login" style={{ marginLeft: '9px', }}>
                Sign In
              </Link></Box>
            </CardActions>
          </Card>
        </Container>
      );
    };
    
    export default SignUp;
