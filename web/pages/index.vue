<template>
  <Main :title="title">
    <h1>Select a default project to get started</h1>
    <Grid>
      <div v-for="account in accounts.data" :key="account.id">
        <nuxt-link :to="'/a/' + account.id">
          <Card>
            <Json :object="account"/>
          </Card>
        </nuxt-link>
      </div>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../components/Card.vue'
import Grid from '../components/Grid.vue'
import Json from '../components/Json.vue'
import Main from '../components/Main.vue'
import * as account from '../store/account'
import * as auth from '../store/auth'

const Auth = namespace(auth.name)
const Account = namespace(account.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
    Json,
  },
})
export default class IndexPage extends Vue {
  public title = 'Home'

  @Account.State public accounts
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
