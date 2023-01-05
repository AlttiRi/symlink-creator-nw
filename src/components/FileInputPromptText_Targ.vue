<template>
  <div class="default-prompt-text">
    <div>Select targets</div>
  </div>
</template>

<script setup>

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
