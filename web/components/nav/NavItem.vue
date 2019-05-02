<template>
  <li class="nav__item">
    <nuxt-link class="nav__item__link" :exact="exact" :to="to">
      <Button :onClick="goTo" variant='ICON'>
        <Icon>
          <slot name="icon"></slot>
        </Icon>
      </Button>
      <p v-show="navOpen" class="nav__item__content">
        <slot></slot>
      </p>
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Button from '../Button.vue'
import Icon from '../Icon.vue'

@Component({ components: { Button, Icon } })
export default class NavItem extends Vue {
  @Prop(Boolean)
  public exact

  @Prop({ type: String, required: true })
  public to

  @Prop({ type: Boolean, required: true })
  public navOpen

  public goTo() {
    this.$router.push(this.to)
  }
}
</script>


<style scoped>
.nav__item {
  display: flex;
  align-items: center;
}

.nav__item__link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--s-4);
  background-color: var(--c-white);
  color: var(--c-black);
  transition: 0.2s color ease, 0.2s background-color ease, 0.2s box-shadow ease;
  overflow: hidden;
}
.nav__item__link:hover {
  color: var(--c-primary-3);
}
.nav__item__link:hover .nav__item__content::after {
  content: '>';
  margin: 0 0 0 var(--s-3);
}
.nav__item__link.nuxt-link-active {
  color: var(--c-primary-3);
  box-shadow: var(--bs-2);
  background-color: var(--c-primary-faded);
}
.nav__item__content {
  margin: 0 0 0 var(--s-4);
}
</style>
