<template>
  <div class="main">
    <Destination/>
    <hr>
    <Content/>
    <button @click="reload" id="reload">Reload</button>
  </div>
</template>

<script setup>
import Destination from "./Destination.vue";
import Content from "./Content.vue";

function reload() {
  location.reload(); // chrome.runtime.reload?.();
}
</script>

<style>
.main {
  min-width: 720px;
  max-width: 1080px;
}

#reload {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
