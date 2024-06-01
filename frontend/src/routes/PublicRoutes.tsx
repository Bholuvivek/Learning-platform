import { createBrowserRouter } from "react-router-dom";
import { PrivetRoutes } from "./ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../AuthPages/Login";
import LandingPage from "../components/LandingPage/LangingPage";
import ErrorNotFount from "../components/Error/ErrorNotFount";
import SignUp from "../AuthPages/SignUp";



export const PublicRoutes = createBrowserRouter([
  ...PrivetRoutes,
  {
    path: '/',
    errorElement: <div>Opps Somthing error</div>,
    element:<>  <AuthLayout /> </> ,
    children: [
      {
        path: 'home-page',
        errorElement: <div>Opps Somthing error</div>,
        element: <LandingPage />,
      },
      {
        path: 'login',
        errorElement: <div>Opps Somthing error</div>,
        element: <Login />,
      },
      {
        path: 'sign-up',
        errorElement: <div>Opps Somthing error</div>,
        element: <SignUp />,
      },
      {
        path: 'blog',
        errorElement: <div>Opps Somthing error</div>,
        element: <div>This is Blog Page</div>
      },
]
  },
  {
    path:'*',
    element:<ErrorNotFount/>
  }

]

)
