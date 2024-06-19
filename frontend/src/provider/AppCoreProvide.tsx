import { actions } from "../store";
import { config } from "../typeDefinintion/config";
import { AppProvider } from "./AppProvider";
import { RouterProvider } from 'react-router-dom';

const AppCoreProvider: React.FC<{ config: config }> = ({ config }) => {
    actions.config.initialize(config);
    return (
    <div>
        <AppProvider>
            <RouterProvider router = {config.router} />
        </AppProvider>
      
    </div>
  )
}

export default AppCoreProvider
