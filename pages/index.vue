<template>
  <Main :title="title">
    <Card>
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
    </Card>
  </Main>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import PersonRow from '~/components/PersonRow.vue'
import Card from '~/components/Card.vue'
import Main from '~/components/Main.vue'

import * as people from '~/store/people'

const People = namespace(people.name)

@Component({
  components: {
    Card,
    PersonRow,
    Main,
  },
})
export default class IndexPage extends Vue {
  title = 'Home'

  @People.State selected
  @People.State people
  @People.Getter selectedPerson
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
  background-color: var(--c-grey-light);
}
</style>
