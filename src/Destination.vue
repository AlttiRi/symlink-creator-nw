<template>
  <div class="destination">

    <h2 class="title" style="grid-area: title;">Destination directory</h2>
    <div class="clear-button" style="grid-area: clear;" tabindex="0">Clear</div>

    <div class="file-input-wrapper" style="grid-area: file-input;">
      <FileInput
          :state="descFileInputState"
          :global-drop-zone="false"
          :multiple="false"
          :nwdirectory="true"
      >

      </FileInput>
    </div>

    <div class="destination-path" style="grid-area: path;">C:/example/new-folder</div>
  </div>
</template>

<script setup>
import FileInput from "./file-input/FileInput.vue";
import {descFileInputState} from "./state.js";


</script>

<style scoped lang="scss">

h2 {
  margin: 0;
}

.destination {
  padding-top: 12px;

  > * {
    display: flex;
    align-items: center;
  }

  .clear-button {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
  display: grid;
  grid-template-columns:  40% auto 20% 20%;
  grid-template-rows: 35px 50px;
  grid-template-areas:
    "title  .     clear  file-input"
    "path   path  path   path";
  gap: 5px 5px;
}

</style>
