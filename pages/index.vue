<template>
  <Main :title="title">
    <Grid>
      <div v-for="account in accounts.data" :key="account.id">
        <Card>{{JSON.stringify(account, null, 2)}}</Card>
      </div>
      <ErrorBox title="Failed to get analytics accounts" :error="error"/>
      <!-- <Card>
        <p>Selected Person: {{ selectedPerson.first_name }} {{ selectedPerson.last_name }}</p>
        <p>{{ selected }}</p>
      </Card>
      <Card>
        <table>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <PersonRow class="person" :person="person"/>
            </tr>
          </tbody>
        </table>
      </Card>-->
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../components/Card.vue'
import BarExample from '../components/charts/BarExample.vue'
import LineExample from '../components/charts/LineExample.vue'
import ErrorBox from '../components/ErrorBox.vue'
import Grid from '../components/Grid.vue'
import Main from '../components/Main.vue'
import PersonRow from '../components/PersonRow.vue'
import * as analytics from '../store/analytics'
import * as auth from '../store/auth'
import * as people from '../store/people'
import { FetchState } from '../types'

const People = namespace(people.name)
const Auth = namespace(auth.name)
const Analytics = namespace(analytics.name)

@Component({
  components: {
    Card,
    PersonRow,
    Main,
    ErrorBox,
    Grid,
    LineExample,
    BarExample,
  },
})
export default class IndexPage extends Vue {
  public title = 'Home'

  @Analytics.State public accounts
  @Analytics.Action public getAccounts
  @Auth.State public user
  @People.State public selected
  @People.State public people
  @People.Getter public selectedPerson

  public layout() {
    return 'app'
  }
  public created() {
    console.log('-------------------- index --> created', this.accounts)
  }

  get error() {
    console.log('-------------------- index --> error', this.accounts)
    return this.accounts.error
  }

  public mounted() {
    if (this.accounts.state === FetchState.INIT) {
      console.log('-------------------- index --> mounted', this.accounts)
      this.getAccounts()
    }
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
