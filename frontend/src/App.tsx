
import { config } from "./typeDefinintion/config"
import AppCoreProvider from "./provider/AppCoreProvide"
import { PublicRoutes } from "./routes/PublicRoutes"
PublicRoutes
const App = () => {

  const config:config ={
    projectName:'Zustand-x',
    defaultRoutes:'/app/home',
    router:PublicRoutes,
  }

  return (
  <div>
   
   <AppCoreProvider config={config} />
   
  </div>
  )
}

export default App
