import {computed, ComputedRef, Ref, ref, toRaw, unref, watchEffect} from "vue";
import {FileInputState, getStateInstance} from "../file-input/file-input-state";
import fs from "../../node-api/node-fs.js";
import {WebFileEntry} from "../file-input/WebFileEntry.js";
import {Stats} from "fs";



export const isNW: boolean = typeof nw !== "undefined" && nw["process"]?.["__nwjs"] === 1;

if (isNW) {
    if (typeof process !== "undefined" && process.versions?.["nw-flavor"] === "sdk") {
        nw.Window.get().showDevTools();
    }
}

// -----------
// FileInput 1
// -----------

export const descFileInputState: FileInputState = getStateInstance({recursive: false});
const destDirectory: Ref<WebFileEntry> = ref(null);
export function clearDestination() {
    destDirectory.value = null;
}
export const hasDestination: ComputedRef<boolean> = computed(() => {
    return Boolean(destDirectory.value);
});

watchEffect(() => {
    const entries: WebFileEntry[] = toRaw(descFileInputState.fileEntries.value) as WebFileEntry[];
    if (!entries.length) {
        return;
    }
    console.log("[destination file input entries]:", entries);
    descFileInputState.clearInput();
    destDirectory.value = entries.find(e => e.type === "folder");
});

export const destDirectoryFullPath: ComputedRef<string> = computed(() => {
    if (!destDirectory.value) {
        return;
    }
    return destDirectory.value.nativePath || (!isNW && "C://.../demo/" + destDirectory.value.name);
});



// -----------
// FileInput 2
// -----------
export const targetFileInputState: FileInputState = getStateInstance({recursive: false});
watchEffect(() => {
    const entries: WebFileEntry[] = toRaw(unref(targetFileInputState.fileEntries)) as WebFileEntry[];
    if (!entries.length) {
        return;
    }
    console.log("[target file input entries]:", entries);
    targetFileInputState.clearInput();
    void appendEntries(entries);
});


declare type Item = {
    filepath: string,
    filename: string,
    id: number,
    symlink: string,
}

export const items: Ref<Item[]> = ref([]);
let id: number = 0;
function addItem({filepath, filename}: {filepath: string, filename: string}) {
    items.value.push({filepath, filename, id: id++, symlink: filename});
}

async function appendEntries(entries: WebFileEntry[]) {
    for (const entry of entries) {
        const filename = entry.name;
        const filepath = isNW ? entry.nativePath : "F:/fake-path/" + filename;
        addItem({filepath, filename});

        const stat = await fs.lstat(filepath) as Stats;
        const isSymbolicLink = stat.isSymbolicLink();
        console.log("[isSymbolicLink]:", stat.isSymbolicLink());
        if (isSymbolicLink) {
            console.log("[readlink]:", await fs.readlink(filepath));
        }
    }
}

export function clearTargets() {
    items.value = [];
}

if (!isNW) {
    addItem({filepath: "F:/fake-path/demo-filepath-1/demo-filename1.txt", filename: "demo-filename1.txt"});
    addItem({filepath: "F:/fake-path/demo-filepath-2/demo-filename2.txt", filename: "demo-filename2.txt"});
    addItem({filepath: "F:/fake-path/demo-filepath-3/demo-filename3.txt", filename: "demo-filename3.txt"});
}

export const useRelPath: Ref<boolean> = ref(false);
