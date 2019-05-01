<template>
  <div class="icon">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Icon extends Vue {}
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--s-5);
  width: var(--s-5);
  height: var(--s-5);
}
.icon svg {
  min-width: 24px;
  width: 24px;
  height: 24px;
}
</style>
