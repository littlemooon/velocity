<template>
  <div class="loader__wrapper">
    <div class="loader">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Spinner extends Vue {}
</script>

<style scoped>
.loader__wrapper {
  height: var(--s-6);
  width: 100%;
}
.loader,
.loader:before,
.loader:after {
  background: var(--c-pink-dark);
  animation: load1 1s infinite ease-in-out;
  width: var(--s-3);
  height: var(--s-2);
}
.loader {
  color: var(--c-pink-dark);
  text-indent: -9999em;
  position: relative;
  top: 28px;
  left: 28px;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -16px;
  animation-delay: -0.32s;
}
.loader:after {
  left: 16px;
}
@keyframes load1 {
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
