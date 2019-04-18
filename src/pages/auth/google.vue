<template>
  <Main :title="title">
    <Card>
      <Spinner/>
    </Card>
  </Main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Spinner from '~/components/Spinner.vue'
import Card from '~/components/Card.vue'

@Component({ components: { Spinner, Card } })
export default class LogoutPage extends Vue {
  title = 'Waiting for google authentication'

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
