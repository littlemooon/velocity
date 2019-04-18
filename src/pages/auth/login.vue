<template>
  <Card>
    <h1>Login</h1>
    <button @click="login">Google Sign In</button>
    <p v-if="errorMessage">errorMessage: {{ errorMessage }}</p>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'

@Component({ components: { Card } })
export default class LoginPage extends Vue {
  layout() {
    return 'auth'
  }

  get errorMessage() {
    return this.$route.query.error
  }

  login() {
    this.$router.push('/auth/google')
  }
}
</script>
