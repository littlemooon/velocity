<template>
  <Main :title="title">
    <template v-slot:header>
      <Button :onClick="logout">Logout</Button>
    </template>
    <Grid v-bind:variant="gridVariant.HALF">
      <Card>{{JSON.stringify(user, 0, 2)}}</Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import Main from '../components/Main.vue'
import Right from '../components/Right.vue'
import Grid, { GridVariant } from '~/components/Grid.vue'
import * as auth from '~/store/auth'

let Auth = namespace(auth.name)

@Component({ components: { Card, Right, Button, Main, Grid } })
export default class AccountPage extends Vue {
  @Auth.State user

  title = 'Account'

  get gridVariant() {
    return GridVariant
  }

  logout() {
    this.$router.push('/auth/logout')
  }
}
</script>
