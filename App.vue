<script setup>
import fs from "./node-fs.js";
import {ref, toRaw, watchEffect} from "vue";
import FileInput from "./file-input/FileInput.vue";
import {fileEntries} from "./file-input/file-input-state.js";

const isNW = typeof nw !== "undefined";

function reload() {
  // chrome.runtime.reload?.();
  location.reload();
}

const items = ref([
    {filepath: "demo-filepath-1/demo-filename1.txt", filename: "demo-filename1.txt"},
    {filepath: "demo-filepath-1/demo-filename2.txt", filename: "demo-filename2.txt"},
    {filepath: "demo-filepath-2/demo-filename3.txt", filename: "demo-filename3.txt"},
]);

async function drop(event) {
  console.log(event);
  event.preventDefault();
  const files = event.dataTransfer.files;

  for (const file of files) {
    console.log(file);
    const filename = file.name;
    const filepath = isNW ? file.path : "???/" + filename;
    console.log({filepath, filename});
    items.value.push({filepath, filename});
    console.log(await fs.stat(filepath));
  }
}

async function dropDest(event) {
  console.log(event);
  event.preventDefault();
  const items = event.dataTransfer.items;
  console.log(items);
}

function dragover(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

watchEffect(() => {
  console.log("watchEffect", toRaw(fileEntries.value));
});

</script>

<template>
  <button @click="reload" id="reload">Reload</button>

  <table>
    <tbody>
      <tr>
        <td><div id="drop-zone" @dragover="dragover" @drop="dropDest">Select destination</div></td>
        <td><div id="drop-zone" @dragover="dragover" @drop="drop">Add file/folder</div></td>
<!--        <FileInput/>-->
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
