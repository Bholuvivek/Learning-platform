

import { Outlet } from "react-router-dom"
import NavBar from "../components/AppBar/NavBar";
import { Box } from "@mui/material";

export type MainLayoutProps = {
    children: React.ReactNode;
  };

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
   

    return <>
    <Box sx={{ mb: 10 }} >
                <NavBar />
            </Box>
    {children||Outlet}
    </>
}