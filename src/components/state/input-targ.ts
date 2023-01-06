import {FileInputState, getStateInstance} from "../file-input/file-input-state.js";
import {ref, Ref, toRaw, unref, watchEffect} from "vue";
import {WebFileEntry} from "../file-input/WebFileEntry.js";
import fs from "../../node-api/node-fs.js";
import {isNW} from "./nw";
import {Stats} from "fs";


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


export type SymlinkInfoItem = {
    filepath: string,
    filename: string,
    id: number,
    symlink: string,
}

export const items: Ref<SymlinkInfoItem[]> = ref([]);
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
