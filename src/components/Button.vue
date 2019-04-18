<template>
  <button v-bind:class="classes" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TRANSPARENT = 'TRANSPARENT',
  ICON = 'ICON',
}

@Component
export default class Button extends Vue {
  @Prop({ type: String, default: ButtonVariant.PRIMARY })
  readonly variant!: ButtonVariant

  @Prop({ type: Function, required: true })
  readonly onClick

  get classes() {
    return {
      button: true,
      'button--primary': this.variant === ButtonVariant.PRIMARY,
      'button--secondary': this.variant === ButtonVariant.SECONDARY,
      'button--transparent': this.variant === ButtonVariant.TRANSPARENT,
      'button--icon': this.variant === ButtonVariant.ICON,
    }
  }
}
</script>

<style scoped>
.button {
  height: var(--s-5);
  border-radius: var(--s-1);
  padding: var(--s-2) var(--s-4);
  transition: 0.1s color ease, 0.2s background-color ease;
}
.button + .button {
  margin: 0 0 0 var(--s-3);
}
.button--primary {
  color: var(--c-white);
  background-color: var(--c-blue);
}
.button--primary:hover,
.button--primary:focus,
.button--primary:active {
  background-color: var(--c-blue-dark);
}
.button--secondary {
  color: var(--c-white);
  background-color: var(--c-gray-3);
}
.button--secondary:hover,
.button--secondary:focus,
.button--secondary:active {
  background-color: var(--c-gray-4);
}
.button--transparent {
  background-color: transparent;
}
.button--transparent:hover {
  color: var(--c-blue);
  background-color: var(--c-gray-1);
}
.button--transparent:focus,
.button--transparent:active {
  background-color: var(--c-gray-1);
}
.button--icon {
  border-radius: 50%;
  background-color: transparent;
  min-width: var(--s-5);
  width: var(--s-5);
  height: var(--s-5);
  padding: 0;
}
.button--icon:hover {
  color: var(--c-blue);
  background-color: var(--c-gray-1);
}
.button--icon:focus,
.button--icon:active {
  color: var(--c-blue);
}
</style>
