<template>
  <h3 class="card__title">
    <slot></slot>
  </h3>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardTitle extends Vue {}
</script>

<style scoped>
.card__title {
  width: 100%;
  font-weight: 500;
  text-align: center;
}
</style>
