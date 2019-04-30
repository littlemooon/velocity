<template>
  <Main :title="title">
    <h1>Select a default project to get started</h1>
    <Grid>
      <div v-for="account in accounts.data" :key="account.id">
        <nuxt-link :to="'/a/' + account.id">
          <Card>{{JSON.stringify(account, null, 2)}}</Card>
        </nuxt-link>
      </div>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../components/Card.vue'
import Grid from '../components/Grid.vue'
import Main from '../components/Main.vue'
import * as analytics from '../store/analytics'
import * as auth from '../store/auth'

const Auth = namespace(auth.name)
const Analytics = namespace(analytics.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
  },
})
export default class IndexPage extends Vue {
  public title = 'Home'

  @Analytics.State public accounts
  @Auth.State public user

  public layout() {
    return 'app'
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
.person {
  padding: var(--s-2) 0;
}
.person:hover {
  background-color: var(--c-gray-2);
}
</style>
