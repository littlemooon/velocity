<template>
  <div class="card__wrapper">
    <section :class="classes" :style="{ borderColor, backgroundColor }">
      <slot name="head"></slot>
      <div class="card__content">
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
  @Prop(String)
  public borderColor
  @Prop(Boolean)
  public clickable

  get classes() {
    return `card column ${this.clickable && `card--clickable`}`
  }
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
  border: 2px solid transparent;
  transition: 0.2s border-color ease, 0.2s box-shadow ease;
}
.card--clickable:hover,
.card--clickable:focus,
.card--clickable:active {
  border-color: var(--c-primary-0);
  box-shadow: var(--bs-2);
}
.card__content {
  padding: var(--s-4);
  border-radius: var(--s-2);
}
</style>
