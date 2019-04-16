<template>
  <nav v-bind:class="{ open: isOpen }" class="nav">
    <div>
      <div class="header">
        <Logo v-show="isOpen"/>
        <Button v-if="isOpen" :onClick="close" class="header__button">←</Button>
        <Button v-else :onClick="open" class="header__button">→</Button>
      </div>
      <ul class="nav__scroll">
        <li class="item">
          <nuxt-link class="link" exact to="/">
            <div class="link__icon"/>
            <p v-show="isOpen" class="link__content">Home</p>
          </nuxt-link>
        </li>
        <li class="item">
          <nuxt-link class="link" to="/components">
            <div class="link__icon"/>
            <p v-show="isOpen" class="link__content">Components</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <ul class="footer">
      <li class="item">
        <nuxt-link class="link" to="/account">
          <div class="link__icon"/>
          <p v-show="isOpen" class="link__content">Name Goes Here</p>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/Button.vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: { Button, Logo },
  data() {
    return {
      isOpen: true,
    }
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
  z-index: 100;
  height: 100vh;
  transition: 0.2s width ease;
}
.nav.open {
  min-width: var(--s-8);
  width: var(--s-8);
}
.nav__scroll {
  overflow-y: scroll;
  max-height: calc(100vh - 2 * var(--s-6));
}

.header {
  display: flex;
  align-items: center;
  height: calc(var(--s-6) + 1px);
  padding: var(--s-4);
  justify-content: space-between;
  border-bottom: 1px solid var(--c-grey);
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
  transition: 0.2s color ease, 0.2s background-color ease;
}
.link:hover {
  background-color: var(--c-grey-light);
}
.link.nuxt-link-active {
  color: var(--c-blue);
}
.link.nuxt-link-active .link__content::after {
  content: '>';
  margin: 0 0 0 var(--s-3);
}
.link__icon {
  min-width: var(--s-5);
  width: var(--s-5);
  height: var(--s-5);
  background-color: var(--c-yellow);
}
.link__content {
  margin: 0 0 0 var(--s-4);
}

.footer {
  border-top: 1px solid var(--c-grey);
}
</style>
