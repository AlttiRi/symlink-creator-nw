

export * from "./input-dest";
export * from "./input-targ";
export * from "./nw";


import {Ref, ref} from "vue";
export const useRelPath: Ref<boolean> = ref(false);


import {addFakeItems} from "./input-targ.js";
import {isNW, isNwSdk} from "./nw.js";

if (isNW && isNwSdk) {
    nw.Window.get().showDevTools();
}

if (!isNW) {
    addFakeItems({filepath: "F:/fake-path/demo-filepath-1/demo-filename1.txt", filename: "demo-filename1.txt"});
    addFakeItems({filepath: "F:/fake-path/demo-filepath-2/demo-filename2.txt", filename: "demo-filename2.txt"});
    addFakeItems({filepath: "F:/fake-path/demo-filepath-3/demo-filename3.txt", filename: "demo-filename3.txt"});
}
