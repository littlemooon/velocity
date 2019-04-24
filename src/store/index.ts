import * as Vuex from 'vuex'
// import axios from 'axios'
import * as auth from './auth'
import * as people from './people'

export interface IState {}

export interface IActions<S, R> extends Vuex.ActionTree<S, R> {
  nuxtServerInit(
    context: Vuex.ActionContext<S, R>,
    serverContext: {
      req: Express.Request & {
        session?: { user?: { name?: string; email?: string } }
      }
    }
  ): void
}

export type Store = Vuex.Store<{
  auth: auth.IState
  people: people.IState
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
      dispatch('auth/setUserFromServer', req.session.user)
    }
  },
}

export let mutations: Vuex.MutationTree<IState> = {}
