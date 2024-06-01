import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store";

export const ProtectedRoute: React.FC<{ children: ReactElement}> = ({ children }) => {
   const isLogged = useStore().auth.isLogged();
    return !isLogged ? (
      <Navigate replace to='/app' />
    ) : (
      children
    );
  };
  