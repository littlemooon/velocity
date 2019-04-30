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

export const name = 'ui'
export const namespaced = true

export const cookies = { navClosed: 'nav_closed' }

export const initial: IState = { nav: { open: true } }

export const state = (): IState => initial

export const getters: GetterTree<IState, IRootState> = {}

export const types = {
  NAV_SET: 'NAV_SET',
}

export const actions: IActions<IState, IRootState> = {
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

export const mutations: MutationTree<IState> = {
  [types.NAV_SET](s, nav: INav) {
    s.nav = nav
  },
}
