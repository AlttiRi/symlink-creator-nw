export * from "./input-dest";
export * from "./input-targ";
export * from "./nw";


import {Ref, ref} from "vue";
export const useRelPath: Ref<boolean> = ref(false);


import {addFakeItems}  from "./input-targ.js";
import {isNW, isNwSdk} from "./nw.js";

if (isNW && isNwSdk) {
    nw.Window.get().showDevTools();
}

if (!isNW) {
    addFakeItems({filename: "demo-filename1.txt"});
    addFakeItems({filename: "demo-filename2.txt"});
    addFakeItems({filename: "demo-filename3.txt"});
}
