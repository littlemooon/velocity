import pTimeout from 'p-timeout'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { IFetchResult } from '../types'
import {
  fetchApi,
  setFetchInit,
  setFetchLoading,
  setFetchResult,
} from '../utils/fetch.util'
import { IState as IRootState } from './index'

export interface IUser {
  name?: string
  email?: string
}

export interface IState {
  authenticated: boolean
  user?: IFetchResult<IUser>
}

export interface IActions<S, R> extends ActionTree<S, R> {
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

export const state = (): IState => ({ authenticated: false })

export const getters: GetterTree<IState, IRootState> = {}

export const actions: IActions<IState, IRootState> = {
  async getUser({ commit, dispatch }) {
    commit(types.USER_SET_LOADING)
    const result = await fetchApi<IUser>('/auth')
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

export const mutations: MutationTree<IState> = {
  [types.AUTHENTICATED_SET](s, authenticated: boolean) {
    s.authenticated = authenticated
  },
  [types.USER_SET_LOADING]: setFetchLoading<IState>('user'),
  [types.USER_SET]: setFetchResult<IState, IUser>('user'),
  [types.USER_CLEAR]: setFetchInit<IState>('user'),
}
