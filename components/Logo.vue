<template>
  <nuxt-link exact to="/">
    <h1>Velocity</h1>
  </nuxt-link>
</template>

<style scoped>
h1 {
  color: var(--c-pink-dark);
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Logo extends Vue {}
</script>
