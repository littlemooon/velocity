<template>
  <div class="tooltip">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Tooltip extends Vue {}
</script>

<style scoped>
.tooltip {
  background-color: var(--c-primary-faded);
  padding: var(--s-3);
  border-radius: var(--s-2);
  box-shadow: var(--bs-1);
}
</style>
