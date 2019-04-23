<template>
  <Card class="auth-card">
    <slot></slot>
  </Card>
</template>

<style scoped>
.auth-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: var(--bp-0);
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Card from './Card.vue'

@Component({ components: { Card } })
export default class AuthCard extends Vue {}
</script>
