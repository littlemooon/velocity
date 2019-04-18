<template>
  <AuthCard>
    <h2>Lets get growing!</h2>
    <button @click="login" class="button">
      <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Google icon</title>
        <path
          d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
        ></path>
      </svg>Sign in with Google
    </button>
    <p v-if="errorMessage">errorMessage: {{ errorMessage }}</p>
  </AuthCard>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AuthCard from '~/components/AuthCard.vue'

@Component({ components: { AuthCard } })
export default class LoginPage extends Vue {
  layout() {
    return 'auth'
  }

  get errorMessage() {
    return this.$route.query.error
  }

  login() {
    this.$router.push('/auth/google')
  }
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--s-6);
  border-radius: var(--s-5);
  background-color: var(--c-white);
  box-shadow: var(--bs-1);
  margin: var(--s-4) 0;
  max-width: 240px;
  width: 100%;
}
.button:hover,
.button:focus,
.button:active {
  box-shadow: var(--bs-2);
}
svg {
  fill: #4285f4;
  margin: 0 var(--s-4) 0 0;
}
</style>
