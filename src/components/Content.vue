<template>
  <div class="main-content">
      <ContentLine v-for="item of items" :item="item" :key="item.id"/>
      <TargetFileInput/>
      <div class="space"></div>
  </div>
</template>

<script setup>
import ContentLine     from "./ContentLine.vue";
import TargetFileInput from "./TargetFileInput.vue";
import {items} from "./state/core";
</script>

<style scoped>
.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.space {
  height: 100%;
  flex-grow: 21;
}
</style>
