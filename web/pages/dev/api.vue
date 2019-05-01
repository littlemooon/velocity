<template>
  <Main :title="title">
    <Grid>
      <Card>
        <Button :onClick="getAccounts">GET /account</Button>
        <Button :onClick="getAccount">GET /account/:id</Button>
        <Button :onClick="getAccountSync">GET /account/sync</Button>
        <Button :onClick="getAuth">GET /auth</Button>
      </Card>
      <Card>
        <h3>{{result.state}}</h3>
        <code>{{result.data ? JSON.stringify(result.data, null, 2) : undefined}}</code>
        <ErrorBox title="Error calling api" :error="result.error"/>
      </Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Button from '../../components/Button.vue'
import Card from '../../components/card/Card.vue'
import ErrorBox from '../../components/ErrorBox.vue'
import Grid from '../../components/Grid.vue'
import Main from '../../components/Main.vue'
import * as ui from '../../store/ui'
import { Fetch } from '../../types'
import { fetchApi } from '../../utils/fetch.util'

@Component({
  components: {
    Card,
    Main,
    Button,
    Grid,
    ErrorBox,
  },
})
export default class DevApiPage extends Vue {
  public result?: Fetch.Result<any>
  public error?: Fetch.Error

  public layout() {
    return 'app'
  }

  public data() {
    return {
      title: 'Api test',
      result: { state: Fetch.State.INIT },
    }
  }

  public async getAuth() {
    const result = await fetchApi<any>('/auth')
    this.result = result

    if (result.error) {
      this.$store.dispatch(`${ui.name}/addNotification`, {
        level: 'error',
        text: 'Failed to get User',
        error: result.error,
      })
    }
  }

  public async getAccounts() {
    const result = await fetchApi('/account')
    this.result = result

    if (result.error) {
      this.$store.dispatch(`${ui.name}/addNotification`, {
        level: 'error',
        text: 'Failed to get /account',
        error: result.error,
      })
    }
  }

  public async getAccount() {
    const result = await fetchApi('/account/36kLqenFOPZkMqBOQgAV')
    this.result = result

    if (result.error) {
      this.$store.dispatch(`${ui.name}/addNotification`, {
        level: 'error',
        text: 'Failed to get /account/36kLqenFOPZkMqBOQgAV',
        error: result.error,
      })
    }
  }

  public async getAccountSync() {
    const result = await fetchApi('/account/sync')
    this.result = result

    if (result.error) {
      this.$store.dispatch(`${ui.name}/addNotification`, {
        level: 'error',
        text: 'Failed to get /account/sync',
        error: result.error,
      })
    }
  }
}
</script>

