<template>
  <button v-bind:class="classes" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.button {
  height: var(--s-5);
  border-radius: var(--s-1);
  padding: var(--s-2) var(--s-4);
  background-color: var(--c-white);
  margin: 0 0 0 var(--s-3);
}
.button:hover,
.button:focus,
.button:active {
  background-color: var(--c-grey-light);
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
  background-color: var(--c-grey);
}
.button--secondary:hover,
.button--secondary:focus,
.button--secondary:active {
  background-color: var(--c-grey-dark);
}
</style>

<script lang="ts">
import Vue from 'vue'

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TRANSPARENT = 'TRANSPARENT',
}

export default Vue.extend({
  props: {
    variant: { type: String, default: ButtonVariant.PRIMARY },
    onClick: {
      type: [Function, Promise],
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        'button--primary': this.variant === ButtonVariant.PRIMARY,
        'button--secondary': this.variant === ButtonVariant.SECONDARY,
      }
    },
  },
})
</script>
