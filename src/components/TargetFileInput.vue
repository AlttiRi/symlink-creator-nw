<template>
  <div class="target-file-select">
    <Options/>
    <div class="file-input">
      <FileInput :state="targetFileInputState" :drop-zone-selector="'.main-content'">
        <template v-slot:prompt>
          <FileInputPromptText_Targ :state="targetFileInputState"/>
        </template>
      </FileInput>
    </div>
  </div>
</template>

<script setup>
import {FileInput} from "@alttiri/vue-file-input";
import FileInputPromptText_Targ from "./FileInputPromptText_Targ.vue";
import Options                  from "./Options.vue";
import {targetFileInputState}   from "./state/core";
</script>

<style scoped lang="scss">
$gap-w: 5px;

.target-file-select {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  gap: 5px $gap-w;
  padding-bottom: 15px;
}
.target-file-select {
  height: 100%;
  width: calc(100% - $gap-w);
  min-height: 40px;
}
</style>
