import { Route } from 'vue-router'
import * as Vuex from 'vuex'
import { Api } from '../types'
import { setFetchCookies } from '../utils/fetch.util'
import * as account from './account'
import * as auth from './auth'
import * as ui from './ui'

export interface State {
  account: account.State
  auth: auth.State
  ui: ui.State
  route: Route
}

export interface Actions<S, R> extends Vuex.ActionTree<S, R> {
  nuxtServerInit(
    context: Vuex.ActionContext<S, R>,
    serverContext: {
      req: {
        cookies: { [x: string]: string }
        session?: Api.Session
      }
    }
  ): void
}

export type Store = Vuex.Store<State>

export const types = {}

export const state = () => ({})

export const getters: Vuex.GetterTree<State, State> = {}

export const actions: Actions<State, State> = {
  async nuxtServerInit({ dispatch }, { req }) {
    setFetchCookies(req.cookies)

    await dispatch(`${[auth.name]}/getUser`)

    if (req.cookies && req.cookies[ui.cookies.navClosed]) {
      await dispatch(`${[ui.name]}/setNav`, false)
    }
  },
}

export const mutations: Vuex.MutationTree<State> = {}
