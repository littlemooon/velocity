<template>
  <h4 class="card__subtitle">
    <slot></slot>
  </h4>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardSubtitle extends Vue {}
</script>

<style scoped>
.card__subtitle {
  width: 100%;
  color: var(--c-gray-2);
  text-align: center;
}
</style>
