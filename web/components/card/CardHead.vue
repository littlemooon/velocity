<template>
  <div class="card__head">
    <h2 v-if="title">{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CardHead extends Vue {
  @Prop(String)
  public title
}
</script>

<style scoped>
.card__head {
  background-color: var(--c-primary-0);
  padding: var(--s-4);
}
</style>
