import { createStore } from "zustand-x";

// side store for side bar
export const sideStore = createStore('sidebar')(
    {
        isOpen:false,
    },
    {
        devtools:{enabled:true}
    }
).extendActions((set,get)=>({
    open:()=>{
        set.isOpen(true);
    },
    close:()=>{
        set.isOpen(false);
    },
    toggle:()=>{
        set.isOpen(!get.isOpen())
    }

}))
