import { User as FirebaseUser } from 'firebase'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import * as firebase from '../services/firebase'
import { IState as IRootState } from '../store/index'

export let name = 'auth'

export let types = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
}

export interface IUser {
  name?: string
  email?: string
}

export interface IState {
  user?: IUser
}

export let namespaced = true

export let state = (): IState => ({})

export let getters: GetterTree<IState, IRootState> = {}

export interface IActions<S, R> extends ActionTree<S, R> {
  setUserFromFirebase(context: ActionContext<S, R>, user: FirebaseUser): void
  setUserFromServer(
    context: ActionContext<S, R>,
    user: { name?: string; email?: string }
  ): void
  login(context: ActionContext<S, R>): void
  logout(context: ActionContext<S, R>): void
}

export let actions: IActions<IState, IRootState> = {
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

export let mutations: MutationTree<IState> = {
  [types.SET_USER](s, user: IUser) {
    s.user = user
  },
  [types.CLEAR_USER](s) {
    s.user = undefined
  },
}
