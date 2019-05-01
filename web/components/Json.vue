<template>
  <code class="json">
    <p v-for="key in keys" :key='key'>
      {{key}}: {{object[key]}}
    </p>
  </code>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Json extends Vue {
  @Prop(Object)
  public readonly object: object | undefined

  get keys() {
    return Object.keys(this.object || {}).sort()
  }
}
</script>
