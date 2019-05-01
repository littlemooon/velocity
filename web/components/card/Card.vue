<template>
  <div class="card__wrapper">
    <section class="card column">
      <slot name="head"></slot>
      <div class="card__content" :style="{ backgroundColor }">
        <slot></slot>
      </div>
      <slot name="foot"></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {
  @Prop(String)
  public backgroundColor
}
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
