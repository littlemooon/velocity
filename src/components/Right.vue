<template>
  <div class="right">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Right extends Vue {}
</script>

<style scoped>
.right {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  overflow: hidden;
  flex-wrap: wrap;
}
</style>
