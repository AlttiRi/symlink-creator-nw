<template>
  <div class="target-file-select">
    <div></div>
    <div class="file-input">
      <FileInput :state="targetFileInputState" :drop-zone-selector="'.main-content'"/>
    </div>
  </div>
</template>

<script setup>
import FileInput from "./file-input/FileInput.vue";
import {targetFileInputState} from "./state.js";
</script>

<style scoped lang="scss">
.target-file-select {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  gap: 5px 5px;
  padding-bottom: 15px;
}
.target-file-select {
  height: 100%;
  width: 100%;
  min-height: 40px;
}
</style>
