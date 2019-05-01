<template>
  <div class="main__wrapper">
    <Header>
      <h1 class="main__title">{{title}}</h1>
      <Right>
        <slot name="header"></slot>
      </Right>
    </Header>
    <div class="main__scroll">
      <main class="main">
        <template v-if="showSpinner">
          <Spinner/>
        </template>
        <template v-else>
          <slot></slot>
        </template>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { requiresAuth } from '../middleware/authenticate-route'
import * as analytics from '../store/analytics'
import { Fetch } from '../types'
import Header from './Header.vue'
import Right from './Right.vue'
import Spinner from './Spinner.vue'

const Analytics = namespace(analytics.name)

@Component({ components: { Header, Right, Spinner } })
export default class Main extends Vue {
  @Prop(String)
  public readonly title!: string

  @Analytics.State public accounts

  get showSpinner() {
    const requiresAccount = requiresAuth(this.$route)
    const accountsLoading =
      !this.accounts ||
      [Fetch.State.INIT, Fetch.State.LOADING].includes(this.accounts.state)

    return requiresAccount && accountsLoading
  }
}
</script>

<style scoped>
.main__wrapper {
  width: 100%;
  background-color: var(--c-gray-0);
  min-height: 100vh;
}
.main__scroll {
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - var(--header-h));
}
.main__title {
  font-size: var(--f-4);
  white-space: nowrap;
}
@media only screen and (max-width: 480px) {
  .main__title {
    display: none;
  }
}
.main {
  width: 100%;
  max-width: 1200px;
  min-width: 320px;
  margin: 0 auto;
  padding: var(--s-4);
}
.main__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
