<template>
  <div class="destination">

    <h2 class="title" :class="{gray: !hasDestination}" style="grid-area: title;">Destination directory</h2>
    <div class="clear-button" :class="{gray: !hasDestination}" @click="onClearClick" style="grid-area: clear;" tabindex="0">Clear</div>

    <div class="file-input-wrapper" style="grid-area: file-input;">
      <FileInput
          :state="descFileInputState"
          :drop-zone-selector="'.destination'"
          :multiple="false"
          :nwdirectory="true"
      >
        <template v-slot:prompt><FileInputPromptText :state="descFileInputState"/></template>
      </FileInput>
    </div>

    <div class="destination-path" style="grid-area: path;">{{destDirectoryFullPath}}</div>
  </div>
</template>

<script setup>
import {FileInput} from "@alttiri/vue-file-input";
import FileInputPromptText from "./FileInputPromptText_Dest.vue";
import {clearDestination, clearTargets, descFileInputState, destDirectoryFullPath, hasDestination} from "./state/core";

function onClearClick() {
  clearDestination();
  clearTargets();
}

</script>

<style scoped lang="scss">

.gray {
  color: gray;
}

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
