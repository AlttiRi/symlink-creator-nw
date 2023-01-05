<template>
  <div class="default-prompt-text">
    <div>{{hasDestination ? "Change directory" : "Select directory"}}</div>
  </div>
</template>

<script setup>
import {hasDestination} from "../state.js";
</script>

<style lang="scss" scoped>
.default-prompt-text {
  width: inherit;
  height: inherit;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    //text-decoration: underline;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
