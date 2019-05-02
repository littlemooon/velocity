<template>
  <component :is="tag" :class="classes" @click="onClick" :href='href'>
    <slot>Button</slot>
  </component>
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
  public readonly variant!: ButtonVariant

  @Prop({ type: Function })
  public readonly onClick

  @Prop({ type: String })
  public readonly href

  get tag() {
    return this.href ? 'a' : 'button'
  }

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
  line-height: 24px;
  border-radius: var(--s-1);
  padding: var(--s-2) var(--s-4);
  transition: 0.1s color ease, 0.2s background-color ease;
  vertical-align: middle;
}
.button:hover,
.button:focus,
.button:active {
  box-shadow: var(--bs-1);
}
.button + .button {
  margin: 0 0 0 var(--s-3);
}
.button--primary {
  color: var(--c-white);
  background-color: var(--c-primary-2);
}
.button--primary:hover,
.button--primary:focus,
.button--primary:active {
  background-color: var(--c-primary-1);
}
.button--secondary {
  color: var(--c-white);
  background-color: var(--c-second-2);
}
.button--secondary:hover,
.button--secondary:focus,
.button--secondary:active {
  background-color: var(--c-second-1);
}
.button--transparent {
  background-color: transparent;
}
.button--transparent:hover {
  color: var(--c-primary-3);
  background-color: var(--c-primary-faded);
}
.button--transparent:focus,
.button--transparent:active {
  background-color: var(--c-primary-faded);
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
  color: var(--c-primary-3);
  background-color: var(--c-primary-faded);
}
.button--icon:focus,
.button--icon:active {
  color: var(--c-primary-3);
}
</style>
