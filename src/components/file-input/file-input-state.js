import {ref, computed, watchEffect, toRaw, readonly} from "vue";
import {WebFileEntry} from "./WebFileEntry.js";

const isNW = typeof nw !== "undefined" && nw.process?.["__nwjs"] === 1;

/**
 * @typedef {Object} FileInputStatePrivate
 * @property {import("vue").Ref<Boolean>}        dropHover
 * @property {import("vue").Ref<Number>}         dropHoverItemCount
 * @property {import("vue").Ref<String[]>}       dropHoverTypes
 * @property {import("vue").Ref<WebFileEntry[]>} fileEntries
 * @property {import("vue").Ref<Boolean>}        parsing
 * @property {import("vue").ComputedRef<WebFileEntry>}  file
 * @property {import("vue").ComputedRef<Number>}        count
 * @property {function(fl: FileList)}      setFiles
 * @property {function(dt: DataTransfer)}  setDataTransfer
 * @property {function(dt: DataTransfer)}  setDataTransferHover
 * @property {function()}                  resetDataTransferHover
 * */
/**
 * @typedef {import("vue").DeepReadonly<import("vue").Ref<WebFileEntry[]>>} WebFileEntryArray
 * */
/**
 * @typedef {Object} FileInputState
 * @typedef  {function()}        clearInput
 * @property {WebFileEntryArray} fileEntries
 * @property {FileInputStatePrivate}  private
 * */

/**
 * @param {Object}  opts
 * @param {boolean} opts.recursive
 // * @return {FileInputState}
 */
export function getStateInstance({recursive} = {}) {
    /** @type {import("vue").Ref<File[]>} */
    const files = ref([]);
    /** @type {import("vue").Ref<DataTransferItem[]>} */
    const dtItems = ref([]);
    /** @type {import("vue").Ref<DataTransfer>} */
    const dataTransfer = ref(null);

    /** @type {import("vue").Ref<Boolean>} */
    const dropHover = ref(false);
    /** @type {import("vue").Ref<Number>} */
    const dropHoverItemCount = ref(0);
    /** @type {import("vue").Ref<String[]>} */
    const dropHoverTypes = ref([]);

    /** @type {import("vue").Ref<Boolean>} */
    const isNwDirectory = ref(false);
    /** @type {import("vue").Ref<HTMLInputElement>} */
    const inputElem = ref(null);

    /** @type {import("vue").Ref<WebFileEntry[]>} */
    const fileEntries = ref([]);
    /** @type {import("vue").Ref<Boolean>} */
    const parsing = ref(false);
    watchEffect(async () => {
        const time = Date.now();
        parsing.value = true;
        if (dataTransfer.value) {
            console.log("[fromDataTransferItems]");
            fileEntries.value = await WebFileEntry.fromDataTransfer(dataTransfer.value, recursive);
        } else
        if (isNW && isNwDirectory.value) {
            console.log("[isNwDirectory]");
            fileEntries.value = WebFileEntry.fromFiles(files.value, "folder");
        } else {
            console.log("[fromFiles]");
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

    /** @param {DataTransfer} dt */
    function setDataTransfer(dt) {
        console.log("setDataTransfer", dt);
        setFiles(dt.files, false);
        _setDtItems(dt.items);
        dataTransfer.value = dt;
    }
    /** @param {FileList} filelist
        @param {boolean} resetDataTransfer */
    function setFiles(filelist, resetDataTransfer = true) {
        /** @type {File[]} */
        const _files = [...filelist];
        files.value = _files;
        console.log("[setFiles]:", _files);
        if (resetDataTransfer) {
            dataTransfer.value = null;
            dtItems.value = [];
        }
    }
    /** @param {DataTransferItemList} items */
    function _setDtItems(items) {
        /** @type {DataTransferItem[]} */
        const _dtItems = [...items];
        dtItems.value = _dtItems;
        console.log("[_setDtItems]:", _dtItems); // bug in chromium: `type` and `kind` is "" in the console when expand the array.
        console.log("[_setDtItems][0]:", {
            kind: _dtItems[0].kind, type: _dtItems[0].type
        });
    }

    function clearInput() {
        inputElem.value.value = null;
        files.value = [];
        dataTransfer.value = null;
        dtItems.value = [];
    }

    return {
        fileEntries: readonly(fileEntries),
        clearInput,
        private: {
            dropHover, dropHoverItemCount, dropHoverTypes,
            fileEntries, parsing,
            file, count,
            setDataTransferHover, resetDataTransferHover,
            setDataTransfer, setFiles,
            isNwDirectory,
            inputElem,
        }
    };
}
