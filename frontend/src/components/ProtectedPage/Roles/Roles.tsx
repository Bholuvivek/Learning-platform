import {  Box, Paper, Typography } from "@mui/material";
import HasRight from "../../../hooks/HasRights"
import { useOne } from "../../../hooks/useOne";
import { RIGHTS } from "../../../typeDefinintion/Right";
import { Link } from "react-router-dom";
const Roles = () => {
    const {data} =  useOne()
    
    return (
      <HasRight permission={[RIGHTS.RIGHTS_ALL,RIGHTS.RIGHTS_CREATE,RIGHTS.RIGHTS_DELETE,RIGHTS.RIGHTS_VIEW]}>
         <Paper sx={{height:'88vh',bgcolor:'#484848',color:'#FFFFFF', width:'full', px:4,py:3}}>
<Box sx={{display:'flex', justifyContent:'space-between',bgcolor:'#FFF',color:'#292929',justifyItems:'center',p:2, borderRadius:3}}>
         <Typography sx={{whiteSpace:'nowrap', fontSize:'2rem'}} > Hello, {data.data.name} </Typography> 
         <Link to={'/add-role'} style={{textDecoration:'none', background:'#2d48Ff', paddingLeft:'5px',color:'#000000',padding:'15px', textAlign:'center', border:'1px solid #2d48Ff',  borderRadius:'10px' 
          }}>
         Add User
         </Link>
         </Box>       
          <Typography sx={{mx:4, mt:6}} variant="h5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea assumenda, iure obcaecati nostrum in voluptatem nisi culpa ut animi corrupti distinctio repellat quae. Quae ratione ipsa a eligendi expedita.
          Sint, vero. Quo debitis nobis recusandae vitae aliquam repudiandae officia assumenda nulla saepe aperiam, molestias doloribus numquam voluptatibus mollitia, corrupti, hic expedita tempora. Excepturi possimus, ullam unde quidem quibusdam voluptas?
          Ratione, quos! Beatae voluptatibus omnis eligendi consequuntur error expedita temporibus nulla dignissimos eveniet illum, facere consectetur voluptas labore distinctio iste esse unde. Quibusdam laudantium deleniti quos non, eligendi cumque quaerat.
          Praesentium quis inventore magni officiis dicta assumenda ipsam nesciunt reprehenderit architecto commodi sed dolorum possimus beatae, perspiciatis omnis iste debitis aliquam iusto eaque. Ullam sunt explicabo totam esse distinctio quis!</Typography>
          
          </Paper>
         
      </HasRight>
    )
  }
export default Roles;