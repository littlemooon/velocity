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
import Nav from '../components/nav/Nav.vue'
import * as account from '../store/account'
import { Fetch } from '../types'

const Account = namespace(account.name)

@Component({ components: { Nav } })
export default class AppLayout extends Vue {
  @Account.State public accounts
  @Account.Action public getAccounts

  public mounted() {
    if (this.accounts.state === Fetch.State.INIT) {
      this.getAccounts()
    }
  }
}
</script>

