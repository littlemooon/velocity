import axios from 'axios'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { IState as IRootState } from './index'

export interface IUser {
  name?: string
  email?: string
}

export interface IState {
  user?: IUser
}

export interface IActions<S, R> extends ActionTree<S, R> {
  setUser(
    context: ActionContext<S, R>,
    user: { name?: string; email?: string }
  ): void
  logout(context: ActionContext<S, R>): void
}

export let name = 'auth'
export let namespaced = true

export let types = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
}

export let state = (): IState => ({})

export let getters: GetterTree<IState, IRootState> = {}

export let actions: IActions<IState, IRootState> = {
  async setUser({ commit }, user) {
    commit(types.SET_USER, {
      name: user.name,
      email: user.email,
    })
  },

  async logout({ commit }) {
    try {
      await axios.get('/api/auth/logout', {
        //   proxy: { host: '127.0.0.1', port: 3000 },
      })
    } catch (err) {
      console.error(err)
    }
    return commit(types.CLEAR_USER)
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
