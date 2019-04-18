<template>
  <AuthCard>
    <h2>Logging out...</h2>
    <Spinner/>
  </AuthCard>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Spinner from '~/components/Spinner.vue'
import AuthCard from '~/components/AuthCard.vue'

@Component({ components: { Spinner, AuthCard } })
export default class LogoutPage extends Vue {
  layout() {
    return 'auth'
  }

  mounted() {
    this.$store.dispatch('auth/logout').then(() => {
      this.$router.push({
        path: '/auth/login',
      })
    })
  }
}
</script>
