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
import Vue from 'vue'
import Nav from '../components/Nav.vue'

export default Vue.extend({
  components: { Nav },
})
</script>

