<template>
  <div class="content-line">

    <div class="line-1 buttons">
      <button :disabled="!hasDestination">Create</button>
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

<script setup>
import {ref} from "vue";
import {hasDestination, items} from "./state.js";

const props = defineProps(["item"]);
/** @type {{filepath, filename, id, symlink}} */
const item = props.item;

function remove() {
  items.value = items.value.filter(i => i !== item);
}

const symlinkNameElem = ref(null);
const symlinkName = item.symlink;

async function onBlur() {
  console.log("onBlur");

  let newName = symlinkNameElem.value.textContent;
  newName = newName
      .replaceAll("\n", "")
      .replaceAll(/[/\\|<>:"?*]+/g, "")
      .replaceAll(/^\s+/g, "")
      .replaceAll(/[.\s]+$/g, "");
  symlinkNameElem.value.textContent = newName;
  item.symlink = newName;
}

</script>

<style scoped>
.content-line {
  display: grid;
  grid-template-columns:  50% 50%;
  grid-template-rows: auto auto;
  gap: 5px 5px;
  padding-bottom: 15px;
}

.line-1 {
  display: flex;
  align-items: center;
}

.buttons > button {
  margin-right: 5px;
}


</style>
