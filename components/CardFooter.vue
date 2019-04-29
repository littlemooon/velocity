<template>
    <div class="card__footer">
      <Right>
        <slot></slot>
      </Right>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Right from './Right.vue'

@Component({ components: { Right } })
export default class CardFooter extends Vue {}
</script>

<style scoped>
.card__footer {
  background-color: var(--c-primary-0);
  padding: var(--s-4);
}
</style>
