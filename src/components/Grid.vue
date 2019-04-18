<template>
  <div v-bind:class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export enum GridVariant {
  FULL = 'FULL',
  HALF = 'HALF',
  WRAP = 'WRAP',
}

@Component
export default class Grid extends Vue {
  @Prop({ type: String, default: GridVariant.FULL })
  readonly variant!: GridVariant

  get classes() {
    return {
      grid: true,
      'grid--full': this.variant === GridVariant.FULL,
      'grid--half': this.variant === GridVariant.HALF,
      'grid--wrap': this.variant === GridVariant.WRAP,
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: var(--s-4);
}
.grid--full {
  grid-template-columns: 1fr;
}
.grid--half {
  grid-template-columns: 1fr 1fr;
}
.grid--wrap {
  grid-template-columns: repeat(auto-fill, var(--s-4));
}
@media only screen and (max-width: 960px) {
  .grid--half {
    grid-template-columns: 1fr;
  }
}
</style>
