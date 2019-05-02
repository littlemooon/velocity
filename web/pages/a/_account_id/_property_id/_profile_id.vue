<template>
  <Main >
    <Grid>
      <Json :object="profile"/>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../../../../components/card/Card.vue'
import CardSubtitle from '../../../../components/card/CardSubtitle.vue'
import CardTitle from '../../../../components/card/CardTitle.vue'
import Grid, { GridVariant } from '../../../../components/Grid.vue'
import Json from '../../../../components/Json.vue'
import Main from '../../../../components/Main.vue'
import * as account from '../../../../store/account'

const Account = namespace(account.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
    Json,
    CardTitle,
    CardSubtitle,
  },
})
export default class ProfileIndexPage extends Vue {
  @Account.Getter public profile

  public layout() {
    return 'app'
  }

  get gridVariant() {
    return GridVariant
  }
}
</script>
