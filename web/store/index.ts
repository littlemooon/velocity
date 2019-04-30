import { Route } from 'vue-router';
import * as Vuex from 'vuex'
import { ISession } from '../types'
import { setFetchCookies } from '../utils/fetch.util'
import * as analytics from './analytics'
import * as auth from './auth'
import * as ui from './ui'

export interface IState {
  analytics: analytics.IState
  auth: auth.IState
  ui: ui.IState
  route: Route
}

export interface IActions<S, R> extends Vuex.ActionTree<S, R> {
  nuxtServerInit(
    context: Vuex.ActionContext<S, R>,
    serverContext: {
      req: {
        cookies: { [x: string]: string }
        session?: ISession
      }
    }
  ): void
}

export type Store = Vuex.Store<IState>

export const types = {}

export const state = () => ({})

export const getters: Vuex.GetterTree<IState, IState> = {}

export const actions: IActions<IState, IState> = {
  async nuxtServerInit({ dispatch }, { req }) {
    setFetchCookies(req.cookies)

    await dispatch(`${[auth.name]}/getUser`)

    if (req.cookies && req.cookies[ui.cookies.navClosed]) {
      await dispatch(`${[ui.name]}/setNavOpen`, false)
    }
  },
}

export const mutations: Vuex.MutationTree<IState> = {}
