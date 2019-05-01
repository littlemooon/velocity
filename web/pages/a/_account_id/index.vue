<template>
  <Main :title="account ? account.name : 'Loading account...'">
    <Grid>
      <Json :object="account"/>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../../../components/card/Card.vue'
import Grid from '../../../components/Grid.vue'
import Json from '../../../components/Json.vue'
import Main from '../../../components/Main.vue'
import * as account from '../../../store/account'

const Account = namespace(account.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
    Json,
  },
})
export default class AccountIndexPage extends Vue {
  public title = 'asd'
  @Account.Getter public account

  public layout() {
    return 'app'
  }
}
</script>
