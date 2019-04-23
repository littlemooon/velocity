<template>
  <Main :title="title">
    <Grid>
      <Card>{{JSON.stringify(user, 0, 2)}}</Card>
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
import Grid from '../components/Grid.vue'
import Main from '../components/Main.vue'
import PersonRow from '../components/PersonRow.vue'
import * as auth from '../store/auth'
import * as people from '../store/people'

const People = namespace(people.name)
const Auth = namespace(auth.name)

@Component({
  components: {
    Card,
    PersonRow,
    Main,
    Grid,
  },
})
export default class IndexPage extends Vue {
  public title = 'Home'

  @Auth.State public user
  @People.State public selected
  @People.State public people
  @People.Getter public selectedPerson
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
