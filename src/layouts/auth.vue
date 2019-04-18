<template>
  <Main>
    <template v-slot:header>
      <div class="center">
        <Logo/>
      </div>
    </template>
    <div class="center">
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
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Main from '~/components/Main.vue'
import Logo from '~/components/Logo.vue'

@Component({ components: { Main, Logo } })
export default class AuthLayout extends Vue {}
</script>
