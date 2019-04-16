<template>
  <header>
    <slot></slot>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>


<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--s-6);
  min-height: var(--s-6);
  background-color: var(--c-white);
  box-shadow: var(--bs-1);
  z-index: 50;
  padding: 0 var(--s-4);
}
</style>
