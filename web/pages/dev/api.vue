<template>
  <Main :title="title">
    <Grid>
      <Card>
        <Button :onClick="getAccounts">GET /account</Button>
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
import Card from '../../components/Card.vue'
import ErrorBox from '../../components/ErrorBox.vue'
import Grid from '../../components/Grid.vue'
import Main from '../../components/Main.vue'
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
  }

  public async getAccounts() {
    const result = await fetchApi('/account')
    this.result = result
  }
}
</script>

