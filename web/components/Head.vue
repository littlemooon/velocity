<template>
  <header>
    <slot></slot>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Head extends Vue {}
</script>


<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--head-h);
  min-height: var(--head-h);
  background-color: var(--c-white);
  box-shadow: var(--bs-1);
  z-index: var(--z-2);
  padding: 0 var(--s-5);
  border-bottom: 1px solid var(--c-gray-3);
}
</style>
