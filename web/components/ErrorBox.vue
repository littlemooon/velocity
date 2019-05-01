<template>
  <div v-if='show' class="error">
    <div class="row error__title">
      <AlertTriangleIcon/>
      <h4>{{title}}</h4>
    </div>
    <code>{{formattedError}}</code>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AlertTriangleIcon } from 'vue-feather-icons'
import { Fetch } from '../types'

@Component({ components: { AlertTriangleIcon } })
export default class ErrorBox extends Vue {
  @Prop({ type: String })
  public title?: string

  @Prop({ type: [String, Error, Object] })
  public error?: string | Fetch.Error

  get show() {
    const slot = this.$slots.default && this.$slots.default[0]
    return Boolean(this.error || (slot && slot.text && slot.text.length))
  }

  get formattedError() {
    const e = this.error

    if (typeof e === 'string') {
      return e
    } else if (e instanceof Error) {
      return e.message
    } else if (e) {
      return [e.status, e.statusText, e.message].join(': ')
    }
  }
}
</script>

<style scoped>
.error {
  width: 100%;
  background-color: var(--c-red-faded);
  border: 1px solid var(--c-red);
  color: var(--c-black);
  border-radius: var(--s-2);
  padding: var(--s-4);
  text-align: left;
}
.error__title {
  min-height: var(--s-5);
  margin: 0 0 var(--s-4);
}
svg {
  color: var(--c-red);
  margin: 0 var(--s-4) 0 0;
}
h4 {
  margin: 0;
}
</style>
