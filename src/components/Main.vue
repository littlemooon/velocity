<template>
  <div class="column">
    <Header>
      <h1 class="title">{{title}}</h1>
      <Right>
        <slot name="header"></slot>
      </Right>
    </Header>
    <div class="scroll">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.column {
  width: 100%;
  background-color: var(--c-gray-1);
  min-height: 100vh;
}
.scroll {
  overflow-y: scroll;
}
.title {
  font-size: var(--f-4);
}
@media only screen and (max-width: 480px) {
  .title {
    display: none;
  }
}
main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--s-4);
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.vue'
import Right from '../components/Right.vue'

export default Vue.extend({
  props: { title: String },
  components: { Header, Right },
})
</script>
