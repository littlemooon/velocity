<template>
  <Main :title="title">
    <template v-slot:header>
      <Button :onClick="logout">Logout</Button>
    </template>
    <Grid v-bind:variant="gridVariant.HALF">
      <Card>
        <p>Username or something</p>
      </Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import Main from '../components/Main.vue'
import Right from '../components/Right.vue'
import Grid, { GridVariant } from '~/components/Grid.vue'

@Component({ components: { Card, Right, Button, Main, Grid } })
export default class AccountPage extends Vue {
  title = 'Account'

  get gridVariant() {
    return GridVariant
  }

  logout() {
    this.$router.push({
      path: '/login',
    })
  }
}
</script>
