<template>
  <Card>
    <h1>Login</h1>
    <button @click="googleSignUp">Google Sign In</button>
  </Card>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'
import * as auth from '~/store/auth'

let Auth = namespace(auth.name)

@Component({ components: { Card } })
export default class LoginPage extends Vue {
  layout() {
    return 'auth'
  }

  @Auth.Action login

  googleSignUp() {
    this.$store
      .dispatch('/auth/login')
      .then(() => {
        console.log('inside then statement on login')
      })
      .catch(e => {
        console.log(e.message)
      })
  }
}
</script>
