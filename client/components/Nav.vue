<template>
  <nav v-bind:class="{ open: isOpen, closed: !isOpen }" class="nav">
    <div>
      <div class="header">
        <Logo v-show="isOpen"/>
        <Button
          v-if="isOpen"
          v-bind:variant="buttonVariants.ICON"
          :onClick="close"
          class="header__button"
        >
          <Icon>
            <ArrowLeftIcon/>
          </Icon>
        </Button>
        <Button v-else v-bind:variant="buttonVariants.ICON" :onClick="open" class="header__button">
          <Icon>
            <MenuIcon/>
          </Icon>
        </Button>
      </div>
      <ul class="nav__scroll">
        <li class="item">
          <nuxt-link class="link" exact to="/">
            <Icon>
              <ActivityIcon/>
            </Icon>
            <p v-show="isOpen" class="link__content">Home</p>
          </nuxt-link>
        </li>
        <li class="item">
          <nuxt-link class="link" to="/components">
            <Icon>
              <CodeIcon/>
            </Icon>
            <p v-show="isOpen" class="link__content">Components</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <ul class="footer">
      <li class="item">
        <nuxt-link class="link" to="/account">
          <Icon>
            <SettingsIcon/>
          </Icon>
          <p v-show="isOpen" class="link__content">{{user ? user.name : 'Account'}}</p>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import {
  ActivityIcon,
  ArrowLeftIcon,
  CodeIcon,
  MenuIcon,
  SettingsIcon,
} from 'vue-feather-icons'
import * as auth from '../store/auth'
import Button, { ButtonVariant } from './Button.vue'
import Icon from './Icon.vue'
import Logo from './Logo.vue'

const Auth = namespace(auth.name)

@Component({
  components: {
    Button,
    Logo,
    Icon,
    ActivityIcon,
    CodeIcon,
    SettingsIcon,
    ArrowLeftIcon,
    MenuIcon,
  },
})
export default class Nav extends Vue {
  public isOpen = false

  @Auth.State public user

  get buttonVariants() {
    return ButtonVariant
  }

  public open() {
    this.isOpen = true
  }
  public close() {
    this.isOpen = false
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
  max-height: calc(100vh - var(--header-h) - var(--nav-footer-h));
}

.header {
  display: flex;
  align-items: center;
  height: var(--header-h);
  padding: var(--s-4);
  justify-content: space-between;
  border-bottom: 1px solid var(--c-gray-3);
}
.header__button {
  min-width: var(--s-5);
  width: var(--s-5);
  height: var(--s-5);
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
}

.link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--s-4);
  background-color: var(--c-white);
  color: var(--c-black);
  transition: 0.1s color ease, 0.2s background-color ease;
  overflow: hidden;
}
.link:hover {
  color: var(--c-blue);
}
.link:hover .link__content::after {
  content: '>';
  margin: 0 0 0 var(--s-3);
}
.link.nuxt-link-active {
  color: var(--c-blue);
  background-color: var(--c-gray-1);
}
.link__content {
  margin: 0 0 0 var(--s-4);
}

.footer {
  border-top: 1px solid var(--c-gray-3);
  height: var(--nav-footer-h);
}

@media only screen and (max-width: 480px) {
  .nav {
    min-width: 0;
    width: 0;
  }
  .nav.closed .header__button {
    position: absolute;
  }
}
</style>
