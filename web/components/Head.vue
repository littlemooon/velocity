<template>
  <header>
    <ul v-if="breadcrumbs.length" class="head__breadcrumbs row">
      <li v-for="(breadcrumb, i) in breadcrumbs" :key="breadcrumb.to">
        <h1 v-if="i === breadcrumbs.length - 1" class="head__breadcrumb">{{breadcrumb.name}}</h1>

        <div v-else class="row">
          <nuxt-link
            class="head__breadcrumb head__breadcrumb__link"
            :to="breadcrumb.to"
          >{{breadcrumb.name}}</nuxt-link>
          <div class="head__breadcrumb__spacer">{{' > '}}</div>
        </div>
      </li>
    </ul>

    <h1 v-if="title" class="head__breadcrumb">{{title}}</h1>

    <slot></slot>
  </header>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import * as account from '../store/account'

const Account = namespace(account.name)

@Component
export default class Head extends Vue {
  @Prop(String)
  public readonly title!: string

  @Account.Getter public breadcrumbs
}
</script>


<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--head-h);
  min-height: var(--head-h);
  background-color: var(--c-white);
  box-shadow: var(--bs-1);
  z-index: var(--z-2);
  padding: 0 var(--s-5);
  border-bottom: 1px solid var(--c-gray-3);
}
.head__breadcrumb {
  white-space: nowrap;
  font-size: var(--f-4);
  font-weight: 400;
  max-width: 320px;
  width: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
}
.head__breadcrumb__link {
  max-width: 240px;
  transition: 0.2s color ease;
  color: var(--c-gray-3);
}
.head__breadcrumb__link:hover,
.head__breadcrumb__link:focus,
.head__breadcrumb__link:active {
  color: var(--c-primary-3);
}
.head__breadcrumb__spacer {
  color: var(--c-gray-3);
  margin: 0 var(--s-3);
  font-size: var(--f-3);
}
</style>
