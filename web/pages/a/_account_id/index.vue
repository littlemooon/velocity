<template>
  <Main>
    <Grid v-if="account" :variant="gridVariant.TINY">
      <nuxt-link
        :to="url + '/' + property.providerId"
        v-for="property in account.properties"
        :key="property.id"
      >
        <Card clickable>
          <CardTitle>{{property.name}}</CardTitle>
          <CardSubtitle>{{property.providerId}}</CardSubtitle>
        </Card>
      </nuxt-link>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../../../components/card/Card.vue'
import CardSubtitle from '../../../components/card/CardSubtitle.vue'
import CardTitle from '../../../components/card/CardTitle.vue'
import Grid, { GridVariant } from '../../../components/Grid.vue'
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
    CardTitle,
    CardSubtitle,
  },
})
export default class AccountIndexPage extends Vue {
  @Account.Getter public account

  public layout() {
    return 'app'
  }

  get url() {
    return this.$route.path
  }

  get gridVariant() {
    return GridVariant
  }
}
</script>
