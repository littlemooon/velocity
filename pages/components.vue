<template>
  <Main :title="title">
    <Card>
      <h1>H1 text</h1>
      <h2>H2 text</h2>
      <h3>H3 text</h3>
      <h4>H4 text</h4>
      <h5>H5 text</h5>
      <h6>H6 text</h6>
      <p>P text</p>
    </Card>
    <Card>
      <Right>
        <Button :onClick="noop" v-bind:variant="variants.PRIMARY">Primary</Button>
        <Button :onClick="noop" v-bind:variant="variants.SECONDARY">Secondary</Button>
        <Button :onClick="noop" v-bind:variant="variants.TRANSPARENT">Transparent</Button>
      </Right>
    </Card>
  </Main>
</template>

<script lang="ts">
import Card from '~/components/Card.vue'
import Main from '~/components/Main.vue'
import Right from '~/components/Right.vue'
import Button, { ButtonVariant } from '../components/Button.vue'

export default {
  data() {
    return { title: 'Components' }
  },
  components: { Card, Button, Right, Main },
  computed: {
    variants() {
      return ButtonVariant
    },
  },
  methods: {
    noop() {},
  },
}
</script>
