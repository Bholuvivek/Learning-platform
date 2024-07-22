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
import LearningHubLanding from "../features/leaning-hub/LearningHubLanding";
import ArticleListCard from "../features/teck-article/ArticleListCard";
import ArticleDetails from "../features/teck-article/ArticleDetails";
import NoteForm from "../testing/NoteForm";
import CourseDetails from "../features/leaning-hub/LearningPage";
import AdminPanel from "../core/admin-panel/AdminPanel";
import AddCourse from "../core/admin-panel/component/AddCourse";
import AddModule from "../core/admin-panel/component/AddModule";
import EditCourse from "../core/admin-panel/component/EditCourse";
import EditModule from "../core/admin-panel/component/EditModule";


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
        path: 'learning-hub',
        errorElement:<div>Oops there is some error</div>,
        element: <LearningHubLanding/>
      },
      {
        path: 'new-note',
        errorElement:<div>Oops there is some error</div>,
        element: <NoteForm/>
      },
      
      {
        path: 'article',
        errorElement:<div>Oops there is some error</div>,
        element: <ArticleListCard/>
      },
      {
        path: 'course/:id',
        errorElement:<div>Oops there is some error</div>,
        element: <CourseDetails/>
      },
      {
        path: 'article/:id',
        errorElement:<div>Oops there is some error</div>,
        element: <ArticleDetails/>
      },
      {
        path: 'dashboard',
        errorElement:<div>Oops there is some error</div>,
        element: <UserDashboar/>
      },

      // Admin Panel
      {
        path: 'admin/panel',
        errorElement: <div>Oops, there is some error</div>,
        element: <AdminPanel />,
      },
      // Course Management
{
  path: 'admin/courses/add',
  errorElement: <div>Oops, there is some error</div>,
  element: <AddCourse />,
},
{
  path: 'admin/courses/edit/:courseId',
  errorElement: <div>Oops, there is some error</div>,
  element: <EditCourse />,
},

// Module Management
{
  path: 'admin/courses/:courseId/modules/add',
  errorElement: <div>Oops, there is some error</div>,
  element: <AddModule />,
},
{
  path: 'admin/courses/:courseId/modules/edit/:moduleId',
  errorElement: <div>Oops, there is some error</div>,
  element: <EditModule />,
},

    ],

  },

]

