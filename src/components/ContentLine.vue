<template>
  <div class="content-line">

    <div class="line-1 buttons">
      <button @click="create" :disabled="!hasDestination" :title="error">Create</button>
      <button @click="remove">Remove</button>
    </div>

    <div class="source-path line-1">{{item.filepath.slice(0, -item.filename.length)}}</div>

    <div class="symlink-name line-2">
      <div ref="symlinkNameElem" contenteditable="true" @blur="onBlur" spellcheck="false">{{symlinkName}}</div>
    </div>

    <div class="source-filename line-2">{{item.filename}}</div>
  </div>
  <hr>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {destDirectoryFullPath, hasDestination, items, useRelPath} from "./state/core";
import {createSymlink} from "../symlink-creator.js";
import {windowsFilename} from "../util.js";

const props = defineProps(["item"]);
/** @type {{filepath, filename, id, symlink}} */
const item = props.item;

function remove() {
  items.value = items.value.filter(i => i !== item);
}


const symlinkNameElem = ref(null);
const symlinkName = item.symlink;

const error = ref(null);
async function create() {
  try {
    await createSymlink({
      destinationDirPath: destDirectoryFullPath.value,
      symlinkName: item.symlink,
      targetFullPath: item.filepath,
      relative: useRelPath.value,
    });
    error.value = null;
  } catch (e) {
    error.value = e;
    console.error(e);
  }
}


async function onBlur() {
  console.log("onBlur");

  let newName = symlinkNameElem.value.textContent;
  newName = windowsFilename(newName);

  symlinkNameElem.value.textContent = newName;
  item.symlink = newName;
}

</script>

<style lang="scss" scoped>
$gap-w: 5px;

.content-line {
  display: grid;
  grid-template-columns:  50% 50%;
  grid-template-rows: auto auto;
  gap: 5px $gap-w;
  padding-bottom: 15px;
  max-width: calc(100% - $gap-w);
}

.line-1 {
  display: flex;
  align-items: center;
}

.buttons > button {
  margin-right: 5px;
}


</style>
