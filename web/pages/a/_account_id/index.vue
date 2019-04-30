<template>
  <Main :title="title">
    <Grid>
      <Card>{{JSON.stringify(account, null, 2)}}</Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../../../components/Card.vue'
import Grid from '../../../components/Grid.vue'
import Main from '../../../components/Main.vue'
import * as analytics from '../../../store/analytics'

const Analytics = namespace(analytics.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
  },
})
export default class AccountIndexPage extends Vue {
  public title = 'asd'
  @Analytics.Getter public account

  public layout() {
    return 'app'
  }
}
</script>
