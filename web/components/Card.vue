<template>
  <div class="card__wrapper">
    <section class="card">
      <slot name="header"></slot>
      <div class="card__content">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Right from './Right.vue'

@Component({ components: { Right } })
export default class Card extends Vue {}
</script>

<style scoped>
.card__wrapper {
  width: 100%;
}
.card {
  width: 100%;
  background-color: var(--c-white);
  border-radius: var(--s-2);
  box-shadow: var(--bs-1);
}
.card__content {
  padding: var(--s-4);
}
</style>
