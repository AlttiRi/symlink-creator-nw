import {ref, computed, watchEffect, toRaw, readonly} from "vue";
import {WebFileEntry} from "./WebFileEntry.js";

export function getStateInstance() {
    /** @type {import("vue").Ref<File[]>} */
    const files = ref([]);
    /** @type {import("vue").Ref<DataTransferItem[]>} */
    const dtItems = ref([]);

    /** @type {import("vue").Ref<Boolean>} */
    const dropHover = ref(false);
    /** @type {import("vue").Ref<Number>} */
    const dropHoverItemCount = ref(0);
    /** @type {import("vue").Ref<String[]>} */
    const dropHoverTypes = ref([]);

    /** @type {import("vue").Ref<WebFileEntry[]>} */
    const fileEntries = ref([]);
    /** @type {import("vue").Ref<Boolean>} */
    const parsing = ref(false);
    watchEffect(async () => {
        const time = Date.now();
        parsing.value = true;
        if (dtItems.value.length) {
            fileEntries.value = await WebFileEntry.fromDataTransferItems(dtItems.value);
        } else {
            fileEntries.value = WebFileEntry.fromFiles(files.value);
        }
        parsing.value = false;
        console.log("[WebFileEntry parsing][time]:", Date.now() - time, "ms");
        console.log("[fileEntries]", toRaw(fileEntries.value));
    });

    /** @type {import("vue").ComputedRef<WebFileEntry>} */
    const file = computed(() => {
        return fileEntries.value[0];
    });
    /** @type {import("vue").ComputedRef<Number>} */
    const count = computed(() => {
        return fileEntries.value.length;
    });

    /** @param {DataTransfer} dataTransfer */
    function setDataTransferHover(dataTransfer) {
        const count = dataTransfer.items.length;
        const allTypes = [...dataTransfer.items].map(item => item.type);
        const types = [...new Set(allTypes)];

        dropHoverItemCount.value = count;
        dropHoverTypes.value = types;
        console.log("[setDataTransferHover]:", count, types);
    }
    function resetDataTransferHover() {
        dropHoverItemCount.value = 0;
        dropHoverTypes.value = [];
    }

    /** @param {DataTransfer} dataTransfer */
    function setDataTransfer(dataTransfer) {
        console.log(dataTransfer);
        setFiles(dataTransfer.files);
        setDtItems(dataTransfer.items);
    }
    /** @param {FileList} filelist */
    function setFiles(filelist) {
        /** @type {File[]} */
        const _files = [...filelist];
        files.value = _files;
        console.log("[setFiles]:", _files);
    }
    /** @param {DataTransferItemList} items */
    function setDtItems(items) {
        /** @type {DataTransferItem[]} */
        const _dtItems = [...items];
        dtItems.value = _dtItems;
        console.log("[setDtItems]:", _dtItems); // bug in chromium: `type` and `kind` is "" in the console when expand the array.

        console.log(_dtItems[0].kind);
        console.log(_dtItems[0].type);
    }
    function resetDtItems() {
        dtItems.value = [];
    }

    return {
        fileEntries: readonly(fileEntries),
        private: {
            dropHover, dropHoverItemCount, dropHoverTypes,
            fileEntries, parsing,
            file, count,
            setDataTransferHover, resetDataTransferHover, setDataTransfer,
            setFiles, setDtItems, resetDtItems
        }
    };
}
