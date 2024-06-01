import { useEffect } from "react";
import { useStore } from "../store";
import { useNavigate, Outlet} from "react-router-dom";
import NavBar from "../components/AppBar/NavBar";
import { Box } from "@mui/material";

    
    const AuthLayout = () => {
        
        const isLogged:boolean = useStore().auth.isLogged();
        const defaultPath = useStore().config.defaultRoutes();
        const navigate = useNavigate();
        useEffect(()=>{
            if(isLogged){
                navigate(defaultPath)
            }
            else{
                navigate('home-page')
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[isLogged])

        return (
            <><Box sx={{ mb: 10 }} >
                <NavBar />
            </Box>
            <div>
      
    </div>
            
              <Outlet />
            </>

        )
    
    }
    
    export default AuthLayout
    