import * as Vuex from 'vuex'
import { ISession } from '../types'
import * as analytics from './analytics'
import * as auth from './auth'
import * as people from './people'
import * as ui from './ui'

export interface IState {}

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

export type Store = Vuex.Store<{
  analytics: analytics.IState
  auth: auth.IState
  people: people.IState
  ui: ui.IState
}>

export let types = {}

export let state = (): IState => ({})

export let getters: Vuex.GetterTree<IState, IState> = {}

export let actions: IActions<IState, IState> = {
  async nuxtServerInit({ dispatch }, { req }) {
    // let response = await axios.get('/random-data.json', {
    //   proxy: { host: '127.0.0.1', port: 3000 },
    // })
    // let staticPeople = response.data.slice(0, 10)
    // commit(`${people.name}/${people.types.SET}`, staticPeople, { root: true })
    if (req.session && req.session.user) {
      dispatch('auth/setUser', req.session.user)
      dispatch('analytics/getAccounts')
    }
    if (req.cookies[ui.cookies.navClosed]) {
      dispatch('ui/setNavOpen', false)
    }
  },
}

export let mutations: Vuex.MutationTree<IState> = {}
