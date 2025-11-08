<template>
  <div class="content-line" @click="logStats">

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
import {ref, useTemplateRef, Ref} from "vue";
import {destDirectoryFullPath, hasDestination, items, useRelPath, SymlinkInfoItem} from "./state/core";
import {createSymlink, getZoneIdentifier} from "../symlink-creator.js";
import {windowsFilename} from "../util.js";
import {fs}              from "../node-api.js";

const props = defineProps(["item"]);
const item: SymlinkInfoItem = props.item;

function remove() {
  items.value = items.value.filter(i => i !== item);
}

const symlinkNameElem: Ref<HTMLDivElement | null> = useTemplateRef("symlinkNameElem");
const symlinkName: string = item.symlink;
const error: Ref<string | null> = ref(null);

async function create() {
  if (!destDirectoryFullPath.value) {
    console.warn("Missed destDirectoryFullPath");
    return;
  }
  try {
    await createSymlink({
      destinationDirPath: destDirectoryFullPath.value,
      symlinkName: item.symlink,
      targetFullPath: item.filepath,
      relative: useRelPath.value,
    });
    error.value = null;
  } catch (e) {
    error.value = String(e);
    console.error(e);
  }
}

async function logStats() {
  const stats = await fs.lstat(item.filepath);
  console.log("[lstat]", item.filename);
  console.log("[lstat]", stats);
  const {ctimeMs: ctime, mtimeMs: mtime, atimeMs: atime, birthtimeMs: btime} = stats;
  console.log("[lstat.times]", {btime, mtime, ctime, atime});

  const data = await getZoneIdentifier(item.filepath);
  console.log("ZoneIdentifier:", data);
}

async function onBlur() {
  console.log("onBlur");
  if (!symlinkNameElem.value) {
    return;
  }

  let newName = symlinkNameElem.value.textContent!; // !
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
