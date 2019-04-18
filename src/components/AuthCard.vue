<template>
  <Card class="auth">
    <slot></slot>
  </Card>
</template>

<style scoped>
.auth {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: var(--bp-0);
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'

@Component({ components: { Card } })
export default class AuthCard extends Vue {}
</script>
