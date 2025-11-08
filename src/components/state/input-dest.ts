import {computed, ComputedRef, ref, Ref, toRaw, watchEffect} from "vue";
import {getStateInstance, FileInputState, WebFileEntry} from "@alttiri/vue-file-input";


export const descFileInputState: FileInputState = getStateInstance({recursive: false});
const destDirectory: Ref<WebFileEntry | null> = ref(null);
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
    destDirectory.value = entries.find(e => e.type === "folder") || null;
});

export const destDirectoryFullPath: ComputedRef<string | undefined> = computed(() => {
    if (!destDirectory.value) {
        return;
    }
    return destDirectory.value.nativePath;
});
