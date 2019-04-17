import axios from 'axios'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import * as people from './people'

export const types = {}

export interface IState {}

export const state = (): IState => ({})

export const getters: GetterTree<IState, IState> = {}

export interface IActions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void
}

export const actions: IActions<IState, IState> = {
  async nuxtServerInit({ commit }) {
    const response = await axios.get('/random-data.json', {
      proxy: { host: '127.0.0.1', port: 3000 },
    })
    const staticPeople = response.data.slice(0, 10)
    commit(`${people.name}/${people.types.SET}`, staticPeople, { root: true })
  },
}

export const mutations: MutationTree<IState> = {}
