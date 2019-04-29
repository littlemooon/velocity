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
        <slot></slot>
      </main>
    </div>
  </div>
</template>

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

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Header from './Header.vue'
import Right from './Right.vue'

@Component({ components: { Header, Right } })
export default class Main extends Vue {
  @Prop(String)
  public readonly title!: string
}
</script>
