<template>
  <Main>
    <template v-slot:header>
      <div class="center">
        <Logo/>
      </div>
    </template>
    <div class="center main">
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
.main {
  margin: var(--s-5) 0;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Main from '~/components/Main.vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({ components: { Main, Logo } })
</script>
