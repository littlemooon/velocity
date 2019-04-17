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
  height: var(--header-h);
  min-height: var(--header-h);
  background-color: var(--c-white);
  box-shadow: var(--bs-1);
  z-index: var(--z-2);
  padding: 0 var(--s-4);
}
</style>
