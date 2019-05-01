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
        <ul v-if="notifications.length" class="main__notifications">
          <li v-for="notification in notifications" :key="notification.id">
            <Notification :notification="notification"/>
          </li>
        </ul>
        <template v-if="loading">
          <Spinner class='main__spinner' immediate/>
        </template>
        <div :class="loading ? 'main--loading':''">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import * as account from '../store/account'
import * as ui from '../store/ui'
import Header from './Header.vue'
import Notification from './Notification.vue'
import Right from './Right.vue'
import Spinner from './Spinner.vue'

const Account = namespace(account.name)
const Ui = namespace(ui.name)

@Component({ components: { Header, Right, Spinner, Notification } })
export default class Main extends Vue {
  @Prop(String)
  public readonly title!: string

  @Account.State public accounts
  @Ui.Getter public loading
  @Ui.State public notifications
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
  margin: 0 auto;
  padding: var(--s-5);
}
.main__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main__notifications {
  position: absolute;
  bottom: 0;
  right: var(--s-4);
  z-index: var(--z-4);
}
.main--loading {
  opacity: 0.5;
}
.main__spinner {
  background: var(--c-white);
  border-radius: 50%;
  padding: var(--s-5);
  position: absolute;
  box-shadow: var(--bs-2);
  height: var(--s-7);
  width: var(--s-7);
  top: 30%;
  left: calc(50% - var(--s-4));
  z-index: var(--z-3);

}
</style>
