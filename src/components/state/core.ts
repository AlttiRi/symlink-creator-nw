export * from "./input-dest.js";
export * from "./input-targ.js";
export * from "./nw.js";


import {Ref, ref} from "vue";
export const useRelPath: Ref<boolean> = ref(false);


import {isNW, isNwSdk} from "./nw.js";

if (isNW && isNwSdk) {
    nw.Window.get().showDevTools();
}
