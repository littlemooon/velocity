<template>
  <AuthCard>
    <h2>Logging out...</h2>
    <Spinner/>
  </AuthCard>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import AuthCard from '../components/AuthCard.vue'
import Spinner from '../components/Spinner.vue'
import * as auth from '../store/auth'

const Auth = namespace(auth.name)

@Component({ components: { Spinner, AuthCard } })
export default class LogoutPage extends Vue {
  @Auth.Action public logout

  public async mounted() {
    await this.logout()
    this.$router.push('/login')
  }
}
</script>
