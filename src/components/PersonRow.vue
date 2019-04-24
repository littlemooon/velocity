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
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import * as people from '../store/people'
import Button from './Button.vue'

const People = namespace(people.name)

@Component({ components: { Button } })
export default class PersonRow extends Vue {
  @Prop() public person
  @People.Action public select
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
