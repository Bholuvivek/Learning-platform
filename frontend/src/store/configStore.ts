import { createStore } from "zustand-x";
import { Router} from '@remix-run/router';
import { config } from "../typeDefinintion/config";
export const configStore = createStore('config')<config>({
    projectName:'',
    defaultRoutes:'',
    router:{} as Router,
}).extendActions((set)=>({

    // in appcore provider :  actions.config.initialize(config);
    initialize:(config:config) =>{
        set.state(()=>config)
    }
}))