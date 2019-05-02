<template>
  <Main>
    <Grid v-if='property' :variant="gridVariant.TINY">
        <nuxt-link
          :to="url + '/' + profile.providerId"
           v-for="profile in property.profiles" :key="profile.id"
          class="link"
        >
          <Card clickable>
            <CardTitle>{{profile.name}}</CardTitle>
            <CardSubtitle>{{profile.providerId}}</CardSubtitle>
          </Card>
        </nuxt-link>
    </Grid>
    <Grid>
      <Json :object="property"/>
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
export default class PropertyIndexPage extends Vue {
  @Account.Getter public property

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
