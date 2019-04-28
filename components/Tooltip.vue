<template>
  <div class="tooltip">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Tooltip extends Vue {}
</script>

<style scoped>
.tooltip {
  background-color: var(--c-gray-1);
  padding: var(--s-3);
  border-radius: var(--s-2);
  box-shadow: var(--bs-1);
}
</style>
