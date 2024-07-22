import { Box, Paper, Typography, Grid } from "@mui/material";
import HasRight from "../../../hooks/HasRights";
import { useOne } from "../../../hooks/useOne";
import { RIGHTS } from "../../../typeDefinintion/Right";
import { Link } from "react-router-dom";
import { userManangementData } from "./components/userManangement";
import TransparenctCard from "./components/TransparenctCard";

const Roles = () => {
    const { data } = useOne();

    return (
        <HasRight permission={[RIGHTS.RIGHTS_ALL, RIGHTS.RIGHTS_CREATE, RIGHTS.RIGHTS_DELETE, RIGHTS.RIGHTS_VIEW]}>
            <Paper sx={{ minHeight: '88vh', bgcolor: '#484848', color: '#FFFFFF',    px: { xs: 2, sm: 4 }, py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#FFF', color: '#292929', alignItems: 'center', p: 2, borderRadius: 3 }}>
                    <Typography sx={{ whiteSpace: 'nowrap', fontSize: '2rem' }}>Hello, {data.data.name}</Typography>
                    <Link to={'/add-role'} style={{
                        textDecoration: 'none',
                        background: '#2d48Ff',
                        padding: '15px',
                        textAlign: 'center',
                        border: '1px solid #2d48Ff',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                    }}>
                        Add User
                    </Link>
                </Box>
                <Grid container spacing={2} sx={{ mt: 4, width:'100%'}}>
                   {userManangementData.map((role)=>(
                    <TransparenctCard key={role.id} title={role.title} content={role.content} />
                   ))}
                </Grid>
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5">Learn More</Typography>
                    <Typography sx={{ mt: 2 }}>
                        Dive deeper into role management and understand best practices. Ensure that your application's security and access controls are robust and efficient.
                    </Typography>
                </Box>
            </Paper>
        </HasRight>
    );
};

export default Roles;
