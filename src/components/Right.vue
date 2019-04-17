<template>
  <div class="right">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>


<style scoped>
.right {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  overflow: hidden;
}
</style>
