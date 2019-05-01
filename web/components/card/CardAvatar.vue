<template>
  <div class="card__avatar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardAvatar extends Vue {}
</script>

<style scoped>
.card__avatar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: var(--s-4);
}
</style>
