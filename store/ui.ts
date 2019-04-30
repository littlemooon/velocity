import Cookies from 'js-cookie'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { IState as IRootState } from './index'

export interface INav {
  open: boolean
}

export interface IState {
  nav: INav
}
export interface IActions<S, R> extends ActionTree<S, R> {
  setNavOpen(context: ActionContext<S, R>, open: boolean): void
}

export let name = 'ui'
export let namespaced = true

export const cookies = { navClosed: 'nav_closed' }

export let initial: IState = { nav: { open: true } }

export let state = (): IState => initial

export let getters: GetterTree<IState, IRootState> = {}

export let types = {
  SET_NAV: 'SET_NAV',
}

export let actions: IActions<IState, IRootState> = {
  async setNavOpen({ commit }, open) {
    if (open) {
      Cookies.remove(cookies.navClosed)
    } else {
      Cookies.set(cookies.navClosed, 'true')
    }

    commit(types.SET_NAV, {
      open,
    })
  },
}

export let mutations: MutationTree<IState> = {
  [types.SET_NAV](s, nav: INav) {
    s.nav = nav
  },
}
