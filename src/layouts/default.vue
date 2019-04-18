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
import { Vue, Component } from 'nuxt-property-decorator'
import Nav from '../components/Nav.vue'

@Component({ components: { Nav } })
export default class DefaultLayout extends Vue {}
</script>

