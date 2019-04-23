<template>
  <AuthCard>
    <h2>Logging out...</h2>
    <Spinner/>
  </AuthCard>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AuthCard from '../../components/AuthCard.vue'
import Spinner from '../../components/Spinner.vue'

@Component({ components: { Spinner, AuthCard } })
export default class LogoutPage extends Vue {
  public layout() {
    return 'auth'
  }

  public mounted() {
    this.$store.dispatch('auth/logout').then(() => {
      this.$router.push({
        path: '/auth/login',
      })
    })
  }
}
</script>
