<template>
  <div class="main-content">
      <ContentLine v-for="item of items" :item="item" :key="item.id"/>
      <TargetFileInput/>
  </div>
</template>

<script setup>
import {items} from "./state.js";
import ContentLine from "./ContentLine.vue";
import TargetFileInput from "./TargetFileInput.vue";

</script>

<style scoped>
.main-content {
  width: 100%;
}
</style>
