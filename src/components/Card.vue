<template>
  <section class="card">
    <slot></slot>
  </section>
</template>

<style scoped>
.card {
  background-color: var(--c-white);
  border-radius: var(--s-2);
  padding: var(--s-4);
  box-shadow: var(--bs-1);
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {}
</script>
