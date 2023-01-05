import {computed, ref, toRaw, watchEffect} from "vue";
import {getStateInstance} from "./file-input/file-input-state.js";
import fs from "../node-fs.js";


export const isNW = typeof nw !== "undefined";
if (isNW) {
    nw.Window.get().showDevTools();
}

// -----------
// FileInput 1
// -----------

export const descFileInputState = getStateInstance({recursive: false});

/**@type {import("vue").ComputedRef<WebFileEntry>} */
const destDirectory = ref(null);
export function clearDestination() {
    destDirectory.value = null;
}

export const hasDestination = computed(() => {
    return Boolean(destDirectory.value);
});

watchEffect(() => {
    /** @type {WebFileEntry[]} */
    const entries = toRaw(descFileInputState.fileEntries.value);
    if (!entries.length) {
        return;
    }
    console.log("[destination file input entries]:", entries);
    descFileInputState.clearInput();
    destDirectory.value = entries.find(e => e.type === "folder");
});

export const destDirectoryFullPath = computed(() => {
    if (!destDirectory.value) {
        return;
    }
    return destDirectory.value.nativePath || (!isNW && ".../demo/" + destDirectory.value.name);
});



// -----------
// FileInput 2
// -----------
export const targetFileInputState = getStateInstance({recursive: false});
watchEffect(() => {
    /** @type {WebFileEntry[]} */
    const entries = toRaw(targetFileInputState.fileEntries.value);
    if (!entries.length) {
        return;
    }
    console.log("[target file input entries]:", entries);
    targetFileInputState.clearInput();
    void appendEntries(entries);
});

export const items = ref([]);
let id = 0;
function addItem({filepath, filename}) {
    items.value.push({filepath, filename, id: id++, symlink: filename});
}

/** @param {WebFileEntry[]} entries */
async function appendEntries(entries) {
    for (/** @type {WebFileEntry} */ const entry of entries) {
        const filename = entry.name;
        const filepath = isNW ? entry.nativePath : "F:/fake-path/" + filename;
        addItem({filepath, filename});
        console.log(await fs.stat(filepath));
    }
}

if (!isNW) {
    addItem({filepath: "demo-filepath-1/demo-filename1.txt", filename: "demo-filename1.txt"});
    addItem({filepath: "demo-filepath-2/demo-filename2.txt", filename: "demo-filename2.txt"});
    addItem({filepath: "demo-filepath-3/demo-filename3.txt", filename: "demo-filename3.txt"});
}
