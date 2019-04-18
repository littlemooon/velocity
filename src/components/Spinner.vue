<template>
  <div class="spinner__wrapper">
    <div class="spinner">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Spinner extends Vue {}
</script>

<style scoped>
.spinner__wrapper {
  display: flex;
  justify-content: center;
  height: var(--s-6);
  width: 100%;
}
.spinner,
.spinner:before,
.spinner:after {
  background: var(--c-pink-dark);
  animation: load 1s infinite ease-in-out;
  width: var(--s-3);
  height: var(--s-2);
}
.spinner {
  color: var(--c-pink-dark);
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
</style>
