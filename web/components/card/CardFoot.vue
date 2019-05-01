<template>
    <div class="card__foot">
      <Right>
        <slot></slot>
      </Right>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Right from '../Right.vue'

@Component({ components: { Right } })
export default class CardFoot extends Vue {}
</script>

<style scoped>
.card__foot {
  background-color: var(--c-primary-0);
  padding: var(--s-4);
}
</style>
