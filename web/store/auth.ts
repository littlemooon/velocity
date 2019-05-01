import pTimeout from 'p-timeout'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { Api, Fetch } from '../types'
import {
  fetchApi,
  setFetchInit,
  setFetchLoading,
  setFetchResult,
} from '../utils/fetch.util'
import { State as RootState } from './index'

export interface State {
  authenticated: boolean
  user?: Fetch.Result<Api.User>
}

export interface Actions<S, R> extends ActionTree<S, R> {
  getUser(context: ActionContext<S, R>): void
  logout(context: ActionContext<S, R>): void
}

export const name = 'auth'
export const namespaced = true

export const types = {
  USER_SET_LOADING: 'USER_SET_LOADING',
  USER_SET: 'USER_SET',
  USER_CLEAR: 'USER_CLEAR',
  AUTHENTICATED_SET: 'AUTHENTICATED_SET',
}

export const state = (): State => ({ authenticated: false })

export const getters: GetterTree<State, RootState> = {}

export const actions: Actions<State, RootState> = {
  async getUser({ commit, dispatch }) {
    commit(types.USER_SET_LOADING)
    const result = await fetchApi<Api.User>('/auth')
    commit(types.USER_SET, result)

    if (result.data && result.data.email) {
      commit(types.AUTHENTICATED_SET, true)

      await pTimeout(
        dispatch('analytics/getAccounts', null, { root: true }),
        1000,
        () => {
          console.warn('auth.store:getUser: getAccounts timeout')
        }
      )
    } else {
      commit(types.AUTHENTICATED_SET, false)
    }
  },

  async logout({ commit }) {
    await fetchApi('/auth/logout')
    return commit(types.USER_CLEAR)
  },
}

export const mutations: MutationTree<State> = {
  [types.AUTHENTICATED_SET](s, authenticated: boolean) {
    s.authenticated = authenticated
  },
  [types.USER_SET_LOADING]: setFetchLoading<State>('user'),
  [types.USER_SET]: setFetchResult<State, Api.User>('user'),
  [types.USER_CLEAR]: setFetchInit<State>('user'),
}
