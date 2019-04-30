<template>
  <Main :title="title">
    <Grid>
      <Card>
        <Button :onClick="getAccounts">GET /api/analytics/account</Button>
      </Card>
      <Card>
        <code>{{result ? JSON.stringify(result, null, 2) : undefined}}</code>
        <ErrorBox title="Error calling api" :error="error"/>
      </Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'nuxt-property-decorator'
import Button from '../../components/Button.vue'
import Card from '../../components/Card.vue'
import ErrorBox from '../../components/ErrorBox.vue'
import Grid from '../../components/Grid.vue'
import Main from '../../components/Main.vue'

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
  public result?: object
  public error?: Error

  public layout() {
    return 'app'
  }

  public data() {
    return {
      title: 'Api test',
      result: undefined,
      error: undefined,
    }
  }

  public async getAccounts() {
    try {
      const result = await axios.get('/api/analytics/account')
      console.log(result)
      this.result = result.data
      this.error = undefined
    } catch (error) {
      const message =
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      console.error(message)
      this.result = undefined
      this.error = message
    }
  }
}
</script>

