<template>
  <Main>
    <template v-slot:header>
      <div class="center">
        <Logo/>
      </div>
    </template>
    <div class="center auth-main">
      <Nuxt/>
    </div>
  </Main>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.auth-main {
  margin-top: 8vh;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '../components/Logo.vue'
import Main from '../components/Main.vue'

@Component({ components: { Main, Logo } })
export default class DefaultLayout extends Vue {}
</script>
