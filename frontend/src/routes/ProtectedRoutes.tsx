/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";
import UserDashboar from "../components/ProtectedPage/Dashboard/UserDashboar";
import UserProfile from "../components/ProtectedPage/UserProfiles/UserProfile";
import Roles from "../components/ProtectedPage/Roles/Roles";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import LandingPage from "../components/LandingPage/LangingPage";
import AddRole from "../components/Form/AddRole";
import Blog from "../components/commonPages/Blog/Blog";
// import BlogPage from "../components/commonPages/Blog/BlogPage";
import BlogCard from "../components/commonPages/Blog/BlogCard";
import BlogDetail from "../components/commonPages/Blog/BlogDetails";
import EditBlog from "../components/commonPages/Blog/EditBlog";


export const AppLayout=()=>{
  return(
      <ProtectedRoute>
       <MainLayout>
          <Outlet/>
       </MainLayout>
    </ProtectedRoute>
  );
};
export const DefaultRoute = () => {
  const isLogged = useStore().auth.isLogged();
  const defalutPath = useStore().config.defaultRoutes();
  return <Navigate to={isLogged ? defalutPath : '/login'} />;
};

 export const PrivetRoutes =[
  {
    path: '/',
    errorElement:<div>Oops there is some error</div>,
    element: <DefaultRoute />,
  },
  {
    path:'add-role',
    errorElement:<div>Oops there is some error</div>,   
    element: <AddRole/>
    
  },
  {
    path: '/app',
    errorElement:<div>Oops there is some error</div>,
    element: <AppLayout/>,
    children:[
      {
     
        path: 'home',
        errorElement:<div>Oops there is some error</div>,
        element:<LandingPage/>,
      },
      {
        path:'add-role',
        errorElement:<div>Oops there is some error</div>,   
        element: <AddRole/>
        
      },
      {
        
        path: 'user',
        errorElement:<div>Oops there is some error</div>,
        element:<UserProfile/>,
      },
      {
        path: 'device',
        errorElement:<div>Oops there is some error</div>,
        element: <div>This is the device Page</div>,
      },
      {
        path: 'role',
        errorElement:<div>Oops there is some error</div>,
        element: <Roles/>,
      },
      {
        path: 'blog',
        errorElement: <div>Opps Somthing error</div>,
        element: <BlogCard />,
        children:[
          {
            path: 'add-blogs',
            errorElement: <div>Opps Somthing error</div>,
            element: <Blog/>
          },
        
          
        ]
      },
      {
        path: 'edit-blog/:id',
        errorElement: <div>Opps Somthing error</div>,
        element: <EditBlog />
      },
      {
        path: 'blog/:id',
        errorElement: <div>Opps Somthing error</div>,
        element: <BlogDetail />
      },      
      {
        path: 'add-blog',
        errorElement: <div>Opps Somthing error</div>,
        element: <Blog/>
      },
     
      
      {
        path: 'device-type',
        errorElement:<div>Oops there is some error</div>,
        element: <div>we have this type of device</div>,
      },
      {
        path: 'dashboard',
        errorElement:<div>Oops there is some error</div>,
        element: <UserDashboar/>
      },
    ],

  },

]

