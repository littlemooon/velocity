<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export enum GridVariant {
  TINY = 'TINY',
  SMALL = 'SMALL',
  MID = 'MID',
  BIG = 'BIG',
}

@Component
export default class Grid extends Vue {
  @Prop({ type: String, default: GridVariant.BIG })
  public readonly variant!: GridVariant

  get classes() {
    return `grid grid--${this.variant.toLowerCase()}`
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: var(--s-5);
}
.grid--tiny {
  grid-gap: var(--s-4);
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.grid--small {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
.grid--mid {
  grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
}
.grid--big {
  grid-template-columns: repeat(auto-fill, minmax(860px, 1fr));
}
@media only screen and (max-width: 480px) {
  .grid--small,
  .grid--mid,
  .grid--big {
    grid-template-columns: 1fr;
  }
}
</style>
