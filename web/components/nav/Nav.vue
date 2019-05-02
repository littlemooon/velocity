<template>
  <nav :class="{ open: isOpen, closed: !isOpen }" class="nav">
    <div>
      <div class="nav__head">
        <div class="center">
          <Logo v-show="isOpen"/>
        </div>
        <Button
          v-if="isOpen"
          :variant="buttonVariants.ICON"
          :onClick="close"
          class="nav__head__button"
        >
          <Icon>
            <ArrowLeftIcon/>
          </Icon>
        </Button>
        <Button v-else :variant="buttonVariants.ICON" :onClick="open" class="nav__head__button">
          <Icon>
            <MenuIcon/>
          </Icon>
        </Button>
      </div>
      <ul class="nav__scroll">
        <NavItem :navOpen="isOpen" exact to="/">
          <template v-slot:icon>
            <FolderIcon/>
          </template>
          Home
        </NavItem>
        <NavItem :navOpen="isOpen" v-if="dev" to="/dev/components">
          <template v-slot:icon>
            <HeartIcon/>
          </template>
          Components
        </NavItem>
        <NavItem :navOpen="isOpen" v-if="dev" to="/dev/api">
          <template v-slot:icon>
            <TerminalIcon/>
          </template>
          Api
        </NavItem>
      </ul>
    </div>
    <ul class="nav__foot">
      <NavItem :navOpen="isOpen" to="/account">
        <template v-slot:icon>
          <SettingsIcon/>
        </template>
        {{username}}
      </NavItem>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import {
  ArrowLeftIcon,
  FolderIcon,
  HeartIcon,
  MenuIcon,
  SettingsIcon,
  TerminalIcon,
} from 'vue-feather-icons'
import env from '../../env'
import * as auth from '../../store/auth'
import * as ui from '../../store/ui'
import Button, { ButtonVariant } from '../Button.vue'
import Icon from '../Icon.vue'
import Logo from '../Logo.vue'
import NavItem from './NavItem.vue'

const Auth = namespace(auth.name)
const Ui = namespace(ui.name)

@Component({
  components: {
    Button,
    Logo,
    Icon,
    FolderIcon,
    HeartIcon,
    SettingsIcon,
    TerminalIcon,
    ArrowLeftIcon,
    MenuIcon,
    NavItem,
  },
})
export default class Nav extends Vue {
  @Auth.State public user
  @Ui.State public nav

  @Ui.Action public setNav

  get buttonVariants() {
    return ButtonVariant
  }

  get dev() {
    return env.dev
  }

  get username() {
    return this.user.data && this.user.data.name
  }

  get isOpen() {
    return this.nav.open
  }

  public open() {
    this.setNav(true)
  }

  public close() {
    this.setNav(false)
  }
}
</script>


<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: var(--s-6);
  width: var(--s-6);
  background-color: var(--c-white);
  box-shadow: var(--bs-2);
  z-index: var(--z-3);
  height: 100vh;
  transition: 0.2s width ease, 0.2s min-width ease;
  overflow: hidden;
}
.nav.open {
  min-width: var(--nav-w);
  width: var(--nav-w);
  max-width: 100vw;
}
.nav__scroll {
  overflow-y: scroll;
  max-height: calc(100vh - var(--head-h) - var(--nav-foot-h));
}

.nav__head {
  display: flex;
  align-items: center;
  height: var(--head-h);
  padding: 0 var(--s-4);
  justify-content: space-between;
}
.nav__head__button {
  min-width: var(--s-5);
  width: var(--s-5);
  height: var(--s-5);
  padding: 0;
  margin: 0;
}

.nav__foot {
  height: var(--nav-foot-h);
}

@media only screen and (max-width: 480px) {
  .nav {
    min-width: 0;
    width: 0;
  }
  .nav.open {
    position: absolute;
    min-width: 100%;
    width: 100%;
  }
}
</style>
