import pTimeout from 'p-timeout'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { Api, Fetch } from '../types'
import {
  fetchApi,
  setFetchInit,
  setFetchLoading,
  setFetchResult,
} from '../utils/fetch.util'
import * as account from './account'
import { State as RootState } from './index'
import * as ui from './ui'

export type User = Api.Db<Api.User>

export interface State {
  authenticated: boolean
  user?: Fetch.Result<User>
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
    const result = await fetchApi<User>('/auth')
    commit(types.USER_SET, result)

    if (result.error) {
      dispatch(
        `${ui.name}/addNotification`,
        {
          level: 'error',
          text: 'Failed to get User',
          error: result.error,
        },
        { root: true }
      )
    }

    if (result.data && result.data.email) {
      commit(types.AUTHENTICATED_SET, true)

      await pTimeout(
        dispatch(`${account.name}/getAccounts`, null, { root: true }),
        600,
        () => {
          console.warn('auth.store:getUser: getAccounts timeout')
          dispatch(`${ui.name}/addLoading`, 'getAccounts', { root: true })
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
  [types.USER_SET]: setFetchResult<State, User>('user'),
  [types.USER_CLEAR]: setFetchInit<State>('user'),
}
