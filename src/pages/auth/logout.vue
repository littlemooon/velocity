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
  title = 'Logout'

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
