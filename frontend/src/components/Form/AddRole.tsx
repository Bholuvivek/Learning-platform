
import { Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const AddRole = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
  };

  return (
    <div>
      <Grid sx={{ display:'flex', alignItems:'center',justifyContent:'space-around', alignSelf:'center'}}>
        <Stack sx={{bgcolor:'#575757',color:'#FFF', width:'25rem',}}>
      <Typography variant='h3' textAlign={'center'}>Add Role</Typography>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding:'70px'}}>
        <div>
          <InputLabel sx={{color:'#FFF'}}>Name:</InputLabel>
          <TextField size='small'  type="text" {...register("name", { required: "Name is required" })} />
          {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
        </div>
        <div>
          <InputLabel sx={{color:'#FFF'}}>Email:</InputLabel>
          <TextField size='small' type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
        </div>
        <div>
          <InputLabel sx={{color:'#FFF'}}>Mobile:</InputLabel>
          <TextField size='small'  type="text" {...register("mobile", { required: "Mobile is required" })} />
          {errors.mobile && <p style={{color:'red'}}>{errors.mobile.message}</p>}
        </div>
        <div>
          <InputLabel sx={{color:'#FFF'}}>Role:</InputLabel>
          <select {...register("role")}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guestuser">Guest User</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      </Stack>
      </Grid>
    </div>
  );
};

export default AddRole;
