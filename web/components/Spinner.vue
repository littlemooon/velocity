<template>
  <div class="spinner__wrapper">
    <div :class='classes'>Loading...</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Spinner extends Vue {
  @Prop(Boolean)
  public immediate

  get classes() {
    return { spinner: true, 'spinner--fade': !this.immediate }
  }
}
</script>

<style scoped>
.spinner__wrapper {
  display: flex;
  justify-content: center;
  height: var(--s-6);
}
.spinner,
.spinner:before,
.spinner:after {
  background: var(--c-primary-2);
  animation: load 1s infinite ease-in-out;
  width: var(--s-3);
  height: var(--s-2);
}
.spinner--fade {
  animation: load 1s infinite ease-in-out, fadeIn 5s ease-in;
}
.spinner {
  color: var(--c-primary-2);
  text-indent: -9999em;
  position: relative;
  top: 28px;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.spinner:before,
.spinner:after {
  position: absolute;
  top: 0;
  content: '';
}
.spinner:before {
  left: -16px;
  animation-delay: -0.32s;
}
.spinner:after {
  left: 16px;
}
@keyframes load {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 16px;
  }
  40% {
    box-shadow: 0 -16px;
    height: 24px;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
