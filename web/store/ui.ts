import Cookies from 'js-cookie'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { State as RootState } from './index'

export interface Nav {
  open: boolean
}

export interface State {
  nav: Nav
}
export interface Actions<S, R> extends ActionTree<S, R> {
  setNavOpen(context: ActionContext<S, R>, open: boolean): void
}

export const name = 'ui'
export const namespaced = true

export const cookies = { navClosed: 'nav_closed' }

export const initial: State = { nav: { open: true } }

export const state = (): State => initial

export const getters: GetterTree<State, RootState> = {}

export const types = {
  NAV_SET: 'NAV_SET',
}

export const actions: Actions<State, RootState> = {
  async setNavOpen({ commit }, open) {
    if (open) {
      Cookies.remove(cookies.navClosed)
    } else {
      Cookies.set(cookies.navClosed, 'true')
    }

    commit(types.NAV_SET, {
      open,
    })
  },
}

export const mutations: MutationTree<State> = {
  [types.NAV_SET](s, nav: Nav) {
    s.nav = nav
  },
}
