<script setup>
import fs from "./node-fs.js";
import {computed, ref, toRaw, unref, watchEffect} from "vue";
import FileInput from "./file-input/FileInput.vue";
import {getStateInstance} from "./file-input/file-input-state.js";

const isNW = typeof nw !== "undefined";
if (isNW) {
  nw.Window.get().showDevTools();
}

function reload() {
  // chrome.runtime.reload?.();
  location.reload();
}


// -----------
// FileInput 1
// -----------
/**@type {import("vue").ComputedRef<WebFileEntry>} */
const destDirectory = ref(null);
const descFileInputState = getStateInstance({recursive: false});
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

const destDirectoryFullPath = computed(() => {
  if (!destDirectory.value) {
    return;
  }
  return destDirectory.value.nativePath || (!isNW && ".../demo/" + destDirectory.value.name);
});


// -----------
// FileInput 2
// -----------
const targetFileInputState = getStateInstance({recursive: false});
watchEffect(() => {
  /** @type {WebFileEntry[]} */
  const entries = toRaw(targetFileInputState.fileEntries.value);
  if (!entries.length) {
    return;
  }
  console.log("[target file input entries]:", entries);
  targetFileInputState.clearInput();
  appendEntries(entries);
});


const items = ref([
    {filepath: "demo-filepath-1/demo-filename1.txt", filename: "demo-filename1.txt"},
    {filepath: "demo-filepath-1/demo-filename2.txt", filename: "demo-filename2.txt"},
    {filepath: "demo-filepath-2/demo-filename3.txt", filename: "demo-filename3.txt"},
]);

/** @param {WebFileEntry[]} entries */
async function appendEntries(entries) {
  for (/** @type {WebFileEntry} */ const entry of entries) {
    const filename = entry.name;
    const filepath = isNW ? entry.nativePath : "???/" + filename;
    items.value.push({filepath, filename});
    console.log(await fs.stat(filepath));
  }
}

</script>

<template>
  <button @click="reload" id="reload">Reload</button>

  <table>
    <tbody>
      <tr>
        <td><FileInput :state="descFileInputState"   :global-drop-zone="false" :nwdirectory="true"/></td>
        <td><FileInput :state="targetFileInputState" :global-drop-zone="false"/></td>
      </tr>
      <tr>
        <td>{{destDirectoryFullPath}}</td>
        <td></td>
      </tr>
      <tr v-for="item of items">
        <td>
          <div><input :value="item.filename"/></div>
        </td>
        <td>
          <div>{{item.filepath}}</div>
          <div>{{item.filename}}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
#drop-zone {
  width: 100%;
  height: 100px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}
table, tbody, tr {
  width: 100%;
}
td {
  width: 50%;
}
td div {
  width: 100%;
  display: flex;
  /*flex-direction: row;*/
  justify-content: center;
}

#reload {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
