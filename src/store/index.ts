import * as Vuex from 'vuex'
// import axios from 'axios'
import { GetterTree, MutationTree, ActionContext, ActionTree } from 'vuex'
import * as people from '~/store/people'
import * as auth from '~/store/auth'

export type State = {}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(
    context: ActionContext<S, R>,
    serverContext: { req: Express.Request & { session?: { user?: { name?: string, email?: string } } } }
  ): void
}

export type Store = Vuex.Store<{
  auth: auth.State
  people: people.State
}>

export let types = {}

export let state = (): State => ({})

export let getters: GetterTree<State, State> = {}

export let actions: Actions<State, State> = {
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

export let mutations: MutationTree<State> = {}
