import {ref, Ref, toRaw, unref, watchEffect} from "vue";
import {getStateInstance, FileInputState, WebFileEntry} from "@alttiri/vue-file-input";
import {fs} from "../../node-api.js";
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

        const filepath = entry.nativePath;
        if (!filepath) {
            console.warn("nativePath is missing");
            return;
        }

        addItem({filename, filepath});
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
