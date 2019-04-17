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
              <HomeIcon/>
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
          <p v-show="isOpen" class="link__content">Name Goes Here</p>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import Icon from '~/components/Icon.vue'
import {
  HomeIcon,
  CodeIcon,
  SettingsIcon,
  ArrowLeftIcon,
  MenuIcon,
} from 'vue-feather-icons'
import Button, { ButtonVariant } from '../components/Button.vue'

export default Vue.extend({
  components: {
    Button,
    Logo,
    Icon,
    HomeIcon,
    CodeIcon,
    SettingsIcon,
    ArrowLeftIcon,
    MenuIcon,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    buttonVariants() {
      return ButtonVariant
    },
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
  },
})
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
  height: calc(var(--header-h) + 1px);
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
