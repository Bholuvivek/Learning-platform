
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link} from 'react-router-dom';

const ErrorNotFound= () => {
 

  return (
    <Container>
      <Grid sx={{ display: 'flex',justifyContent:'center', mx: 10,my:10}}>
        <Card sx={{ display: 'grid', justifyContent: 'center', px:15,py:10, bgcolor:'#585858'}}>
          <Typography variant="h3"color='error.main' my={3} sx={{textAlign:'center', fontWeight:900}}>404</Typography>
          <Typography variant="h4" color='error.main'  my={3} sx={{textAlign:'center', fontWeight:900}} >Not Found</Typography>
          <Link to={'/'} style={{textDecoration:'none', background:'#2d48Ff', paddingLeft:'5px',color:'#000000', paddingTop:'8px', paddingBottom:'8px',textAlign:'center',marginTop:'30px', border:'1px solid #2d48Ff',  borderRadius:'10px'
            
          }}>
       
            Go Back
         </Link>
        </Card>
      </Grid>
    </Container>
  );
};

export default ErrorNotFound;
