<template>
  <AuthCard>
    <h2>Waiting for google...</h2>
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

  async mounted() {
    try {
      const redirect = await this.$store.dispatch('auth/checkForRedirect')
      if (redirect) {
        this.$router.push('/')
      } else {
        this.$store.dispatch('auth/login')
      }
    } catch (error) {
      this.$router.push({
        path: '/auth/login',
        query: { error: error.message },
      })
    }
  }
}
</script>
