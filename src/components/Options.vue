<template>
  <div class="options">
     <label>
       <input type="checkbox" v-model="useRelPath">Use relative path
     </label>
  </div>
</template>

<script setup>
import {useRelPath} from "../state.js";
</script>

<style scoped>
.options, label  {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
