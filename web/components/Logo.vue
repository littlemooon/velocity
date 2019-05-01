<template>
  <nuxt-link exact to="/">
    <h1>Velocity</h1>
  </nuxt-link>
</template>

<style scoped>
h1 {
  color: var(--c-primary-3);
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Logo extends Vue {}
</script>

<style scoped>
h1 {
  margin: 0;
}
</style>
