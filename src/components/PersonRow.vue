<template>
  <div class="person">
    <div class="row">
      <img :src="'https://robots.johnlindquist.com/' + person.first_name + '_' + person.last_name">
      <p>{{ person.first_name }} {{ person.last_name }}</p>
    </div>
    <Button :onClick="select(person.id)">Select</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, namespace } from 'nuxt-property-decorator'
import Button from '~/components/Button.vue'

import * as people from '~/store/people'

let People = namespace(people.name)

@Component({ components: { Button } })
export default class PersonRow extends Vue {
  @Prop() person
  @People.Action select
}
</script>

<style scoped>
.person {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 var(--s-3);
}
</style>
