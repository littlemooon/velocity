<template>
  <Main :title="title">
    <template v-slot:header>
      <Button :onClick="logout">Logout</Button>
    </template>
    <Card>
      <p>Username or something</p>
    </Card>
  </Main>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import Main from '../components/Main.vue'
import Right from '../components/Right.vue'

export default Vue.extend({
  components: { Card, Right, Button, Main },
  data() {
    return { title: 'Account' }
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/login',
      })
    },
  },
})
</script>
