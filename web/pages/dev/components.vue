<template>
  <Main :title="title">
    <Grid v-bind:variant="gridVariant.HALF">
      <Card>
        <h1>H1 text Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
        <h2>H2 text Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
        <h3>H3 text Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        <h4>H4 text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
        <h5>H5 text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
        <h6>H6 text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
        <p>P text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </Card>
      <Card>
        <div class="swatch__row item">
          <div class="swatch black"/>
          <div class="swatch gray-2"/>
          <div class="swatch gray-1"/>
          <div class="swatch gray-0"/>
          <div class="swatch blue-light"/>
          <div class="swatch blue"/>
          <div class="swatch green-light"/>
          <div class="swatch green"/>
          <div class="swatch orange-light"/>
          <div class="swatch orange"/>
          <div class="swatch pink-light"/>
          <div class="swatch pink"/>
          <div class="swatch purple-light"/>
          <div class="swatch purple"/>
          <div class="swatch red-light"/>
          <div class="swatch red"/>
          <div class="swatch turqouise-light"/>
          <div class="swatch turqouise"/>
          <div class="swatch yellow-light"/>
          <div class="swatch yellow"/>
        </div>
        <div class="item">
          <Spinner/>
        </div>
        <div class="item">
          <Tooltip>Tooltip text goes in here somewhere</Tooltip>
        </div>
        <div class="item">
          <Button :onClick="noop" v-bind:variant="buttonVariant.PRIMARY">Primary</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.SECONDARY">Secondary</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.TRANSPARENT">Transparent</Button>
          <Button :onClick="noop" v-bind:variant="buttonVariant.ICON">I</Button>
        </div>

        <template v-slot:footer>
          <CardFooter>
            <Button :onClick="noop" v-bind:variant="buttonVariant.PRIMARY">Primary</Button>
            <Button :onClick="noop" v-bind:variant="buttonVariant.SECONDARY">Secondary</Button>
            <Button :onClick="noop" v-bind:variant="buttonVariant.TRANSPARENT">Transparent</Button>
            <Button :onClick="noop" v-bind:variant="buttonVariant.ICON">I</Button>
          </CardFooter>
        </template>
      </Card>
      <LineExample/>
      <BarExample/>
    </Grid>
  </Main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Button, { ButtonVariant } from '../../components/Button.vue'
import Card from '../../components/Card.vue'
import CardFooter from '../../components/CardFooter.vue'
import BarExample from '../../components/charts/BarExample.vue'
import LineExample from '../../components/charts/LineExample.vue'
import Grid, { GridVariant } from '../../components/Grid.vue'
import Icon from '../../components/Icon.vue'
import Main from '../../components/Main.vue'
import Right from '../../components/Right.vue'
import Spinner from '../../components/Spinner.vue'
import Tooltip from '../../components/Tooltip.vue'

@Component({
  components: {
    Card,
    Button,
    Right,
    Icon,
    Main,
    Spinner,
    Tooltip,
    CardFooter,
    Grid,
    LineExample,
    BarExample,
  },
})
export default class ComponentsPage extends Vue {
  get buttonVariant() {
    return ButtonVariant
  }

  get gridVariant() {
    return GridVariant
  }

  public title = 'Components'

  public layout() {
    return 'app'
  }

  public noop() {
    alert('hit')
  }
}
</script>

<style scoped>
.item + .item {
  margin: var(--s-4) 0 0;
}
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
.gray-2 {
  background-color: var(--c-gray-3);
}
.gray-1 {
  background-color: var(--c-gray-2);
}
.gray-0 {
  background-color: var(--c-gray-1);
}
.blue-light {
  background-color: var(--c-blue-light);
}
.blue {
  background-color: var(--c-blue);
}
.green-light {
  background-color: var(--c-green-light);
}
.green {
  background-color: var(--c-green);
}
.orange-light {
  background-color: var(--c-orange-light);
}
.orange {
  background-color: var(--c-orange);
}
.pink-light {
  background-color: var(--c-pink-light);
}
.pink {
  background-color: var(--c-pink);
}
.purple-light {
  background-color: var(--c-purple-light);
}
.purple {
  background-color: var(--c-purple);
}
.red-light {
  background-color: var(--c-red-light);
}
.red {
  background-color: var(--c-red);
}
.turqouise-light {
  background-color: var(--c-turqouise-light);
}
.turqouise {
  background-color: var(--c-turqouise);
}
.yellow-light {
  background-color: var(--c-yellow-light);
}
.yellow {
  background-color: var(--c-yellow);
}
</style>
