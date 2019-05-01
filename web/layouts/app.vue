<template>
  <div class="row">
    <Nav/>
    <Nuxt/>
  </div>
</template>

<style scoped>
.row {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Nav from '../components/Nav.vue'
import * as analytics from '../store/analytics'
import { Fetch } from '../types'

const Analytics = namespace(analytics.name)

@Component({ components: { Nav } })
export default class AppLayout extends Vue {
  @Analytics.State public accounts
  @Analytics.Action public getAccounts

  public mounted() {
    if (this.accounts.state === Fetch.State.INIT) {
      this.getAccounts()
    }
  }
}
</script>

