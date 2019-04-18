<template>
  <Main :title="title">
    <Grid v-bind:variant="gridVariant.HALF">
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
          <Button :onClick="noop" v-bind:variant="buttonVariant.PRIMARY">Primary</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.SECONDARY">Secondary</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.TRANSPARENT">Transparent</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.ICON">I</Button>
        </Right>
      </Card>
      <Card>
        <div class="swatch__row">
          <div class="swatch black"/>
          <div class="swatch gray-3"/>
          <div class="swatch gray-2"/>
          <div class="swatch gray-1"/>
          <div class="swatch gray-0"/>
          <div class="swatch yellow"/>
          <div class="swatch orange"/>
          <div class="swatch red-light"/>
          <div class="swatch red"/>
          <div class="swatch pink"/>
          <div class="swatch pink-dark"/>
          <div class="swatch purple"/>
          <div class="swatch blue-steel"/>
          <div class="swatch blue-dark"/>
          <div class="swatch blue"/>
          <div class="swatch blue-light"/>
          <div class="swatch blue-green"/>
          <div class="swatch green-dark"/>
          <div class="swatch green"/>
          <div class="swatch green-light"/>
        </div>
      </Card>
      <Card>
        <Spinner/>
      </Card>
      <Card>
        <Tooltip>Tooltip text goes in here somewhere</Tooltip>
      </Card>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'
import Main from '~/components/Main.vue'
import Right from '~/components/Right.vue'
import Icon from '~/components/Icon.vue'
import Spinner from '~/components/Spinner.vue'
import Tooltip from '~/components/Tooltip.vue'
import Grid, { GridVariant } from '~/components/Grid.vue'
import Button, { ButtonVariant } from '../components/Button.vue'

@Component({
  components: { Card, Button, Right, Icon, Main, Spinner, Tooltip, Grid },
})
export default class ComponentsPage extends Vue {
  title = 'Components'

  get buttonVariant() {
    return ButtonVariant
  }

  get gridVariant() {
    return GridVariant
  }

  noop() {}
}
</script>

<style local>
.swatch__row {
  display: grid;
  grid-gap: var(--s-4);
  grid-template-columns: repeat(auto-fill, var(--s-5));
}
.swatch {
  height: var(--s-5);
  width: var(--s-5);
}
.black {
  background-color: var(--c-black);
}
.gray-3 {
  background-color: var(--c-gray-4);
}
.gray-2 {
  background-color: var(--c-gray-3);
}
.gray-1 {
  background-color: var(--c-gray-2);
}
.gray-0 {
  background-color: var(--c-gray-1);
}
.yellow {
  background-color: var(--c-yellow);
}
.orange {
  background-color: var(--c-orange);
}
.red-light {
  background-color: var(--c-red-light);
}
.red {
  background-color: var(--c-red);
}
.pink {
  background-color: var(--c-pink);
}
.pink-dark {
  background-color: var(--c-pink-dark);
}
.purple {
  background-color: var(--c-purple);
}
.blue-dark {
  background-color: var(--c-blue-dark);
}
.blue-steel {
  background-color: var(--c-blue-steel);
}
.blue-light {
  background-color: var(--c-blue-light);
}
.blue {
  background-color: var(--c-blue);
}
.blue-green {
  background-color: var(--c-blue-green);
}
.green-dark {
  background-color: var(--c-green-dark);
}
.green {
  background-color: var(--c-green);
}
.green-light {
  background-color: var(--c-green-light);
}
</style>
