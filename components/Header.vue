<template>
  <header>
    <slot></slot>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {}
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
  border-bottom: 1px solid var(--c-gray-3);
}
</style>
