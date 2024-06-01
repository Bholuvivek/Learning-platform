
import { createStore } from "zustand-x"

interface AuthStore{
   userDetails:|{
    username:string;
    password:string;
   
}|undefined
    isLogged:boolean;
}

export const authStore = createStore('auth')<AuthStore>(
    {   
        isLogged:false,
        userDetails:undefined,
    },
    {
        devtools:{enabled:true},
        persist:{
            enabled:true,
            name:'Zustand-X',
            getStorage:()=>window.localStorage,
        },
    }).extendActions((set)=>({
        setTokens:(username:string, password:string)=>{
            if(username === '' || password ===''){
                throw new Error("Username and password not getting")
            }
            set.state((state)=>({
                ...state,
                userDetails:{username:username, password:password},
                isLogged:true
            }))
        },
        removeToken:({isLogged:false, username:'', password:''})
    }))
