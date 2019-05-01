<template>
  <Main :title="title">
    <Grid :variant="gridVariant">
      <nuxt-link
        :to="'/a/' + account.id"
        v-for="account in accounts.data"
        :key="account.id"
        class="link"
      >
        <Card>
          <CardAvatar>
            <GoogleAnalyticsLogo/>
          </CardAvatar>
          <CardTitle>{{account.name}}</CardTitle>
          <CardSubtitle>{{account.providerId}}</CardSubtitle>
        </Card>
      </nuxt-link>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '../components/card/Card.vue'
import CardAvatar from '../components/card/CardAvatar.vue'
import CardSubtitle from '../components/card/CardSubtitle.vue'
import CardTitle from '../components/card/CardTitle.vue'
import Grid, { GridVariant } from '../components/Grid.vue'
import GoogleAnalyticsLogo from '../components/icons/GoogleAnalyticsLogo.vue'
import Json from '../components/Json.vue'
import Main from '../components/Main.vue'
import * as account from '../store/account'
import * as auth from '../store/auth'

const Auth = namespace(auth.name)
const Account = namespace(account.name)

@Component({
  components: {
    Card,
    Main,
    Grid,
    Json,
    CardAvatar,
    CardTitle,
    CardSubtitle,
    GoogleAnalyticsLogo,
  },
})
export default class IndexPage extends Vue {
  public title = 'Projects'

  @Account.State public accounts
  @Auth.State public user

  get gridVariant() {
    return GridVariant.SMALL
  }

  public layout() {
    return 'app'
  }
}
</script>

<style lang="postcss" scoped>
h1 {
  color: orange;
  @apply --bg-color;
}
.link {
  width: 100%;
}
</style>
