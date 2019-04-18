import { ActionTree, GetterTree, MutationTree, ActionContext } from 'vuex'
import { State as RootState } from '~/store/index'
import * as firebase from '~/services/firebase'
import { User as FirebaseUser } from 'firebase'

export let name = 'auth'

export let types = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
}

export interface User {
  name?: string
  email?: string
}

export interface State {
  user?: User
}

export let namespaced = true

export let state = (): State => ({})

export let getters: GetterTree<State, RootState> = {}

export interface Actions<S, R> extends ActionTree<S, R> {
  setUserFromFirebase(context: ActionContext<S, R>, user: FirebaseUser): void
  setUserFromServer(context: ActionContext<S, R>, user: { name?: string, email?: string }): void
  login(context: ActionContext<S, R>): void
  logout(context: ActionContext<S, R>): void
}

export let actions: Actions<State, RootState> = {
  async setUserFromFirebase({ commit }, user) {
    commit(types.SET_USER, {
      name: user.displayName,
      email: user.email,
    })
  },
  async setUserFromServer({ commit }, user) {
    commit(types.SET_USER, {
      name: user.name,
      email: user.email,
    })
  },


  async login() {
    await firebase.auth.signInWithRedirect(firebase.GoogleProvider)
  },

  async checkForRedirect({ dispatch }) {
    try {
      const result = await firebase.auth.getRedirectResult()

      if (result.user) {
        dispatch('setUserFromFirebase', result.user)
        return true
      }
    } catch (error) {
      console.error('Failed to get firebase redirect result', error)
    }
  },

  async logout({ commit }) {
    document.cookie = '__session=;max-age=0'
    try {
      await firebase.auth.signOut()
      return await commit(types.CLEAR_USER)
    } catch (err) {
      return console.error(err)
    }
  },
}

export let mutations: MutationTree<State> = {
  [types.SET_USER](s, user: User) {
    s.user = user
  },
  [types.CLEAR_USER](s) {
    s.user = undefined
  },
}
