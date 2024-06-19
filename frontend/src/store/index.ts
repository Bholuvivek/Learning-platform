import { mapValuesKey } from "zustand-x";
import { authStore } from "./authStrore";
import { configStore } from "./configStore";
import { sideStore } from "./sideBar";


export const rootStore = {
    auth:authStore,
    config:configStore,
    sidebar:sideStore
}

export const useStore = () => mapValuesKey('use', rootStore);
export const store = mapValuesKey('get', rootStore);
export const actions = mapValuesKey('set', rootStore);