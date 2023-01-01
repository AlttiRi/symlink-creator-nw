import {ref, computed, watchEffect, toRaw, readonly} from "vue";
import {WebFileEntry} from "./WebFileEntry.js";


/**
 * @typedef {
 *  {
 *    private: {
 *      dropHover:          import("vue").Ref<Boolean>,
 *      dropHoverItemCount: import("vue").Ref<Number>,
 *      dropHoverTypes:     import("vue").Ref<String[]>,
 *      fileEntries:        import("vue").Ref<WebFileEntry[]>,
 *      parsing:            import("vue").Ref<Boolean>,
 *      file:               import("vue").ComputedRef<WebFileEntry>,
 *      count:              import("vue").ComputedRef<Number>,
 *      setFiles:               function(fl: FileList),
 *      setDataTransfer:        function(dt: DataTransfer),
 *      setDataTransferHover:   function(dt: DataTransfer),
 *      resetDataTransferHover: function(),
 *    },
 *    fileEntries: import("vue").DeepReadonly<import("vue").Ref<WebFileEntry[]>>
 *  }
 * } FileInputState
 */

/**
 * @param {Object}  opts
 * @param {boolean} opts.recursive
 * @return {FileInputState}
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

    return {
        fileEntries: readonly(fileEntries),
        private: {
            dropHover, dropHoverItemCount, dropHoverTypes,
            fileEntries, parsing,
            file, count,
            setDataTransferHover, resetDataTransferHover,
            setDataTransfer, setFiles,
        }
    };
}
