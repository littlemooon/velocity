<template>
<Card v-if='object'>
  <code  class="json">
    <p v-for="key in keys" :key='key'>
      {{key}}: {{object[key]}}
    </p>
  </code></Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Card from './card/Card.vue'

@Component({ components: { Card } })
export default class Json extends Vue {
  @Prop(Object)
  public readonly object: object | undefined

  get keys() {
    return Object.keys(this.object || {}).sort()
  }
}
</script>
