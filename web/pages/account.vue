<template>
  <Main :title="title">
    <template v-slot:header>
      <Button :href="logoutUrl">Logout</Button>
    </template>
    <Grid v-bind:variant="gridVariant.HALF">
      <Card>
        <Json :object="user.data"/>
      </Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import Grid, { GridVariant } from '../components/Grid.vue'
import Json from '../components/Json.vue'
import Main from '../components/Main.vue'
import Right from '../components/Right.vue'
import env from '../env'
import * as auth from '../store/auth'

const Auth = namespace(auth.name)

@Component({ components: { Card, Right, Button, Main, Grid, Json } })
export default class AccountPage extends Vue {
  get gridVariant() {
    return GridVariant
  }

  get logoutUrl() {
    return `${env.webUrl}/api/auth/logout`
  }

  @Auth.State public user

  public title = 'Account'

  public layout() {
    return 'app'
  }
}
</script>
