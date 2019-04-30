import fetch from 'isomorphic-fetch'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import env from '../env'
import { FetchError, FetchState, IFetchResult } from '../types'
import { IState as IRootState } from './index'

export type AnalyticPermissions =
  | 'COLLABORATE'
  | 'EDIT'
  | 'MANAGE_USERS'
  | 'READ_AND_ANALYZE'

export interface IAnalyticAccount {
  id: string
  name: string
  permissions: {
    effective: AnalyticPermissions[]
  }
  created: string
  updated: string
}

export interface IState {
  accounts: IFetchResult<IAnalyticAccount[]>
}

export interface IActions<S, R> extends ActionTree<S, R> {
  getAccounts(context: ActionContext<S, R>): void
}

export let name = 'analytics'
export let namespaced = true

export let types = {
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_ACCOUNTS_ERROR: 'SET_ACCOUNTS_ERROR',
}

export let initial = {
  accounts: { state: FetchState.INIT, data: [] },
}

export let state = (): IState => initial

export let getters: GetterTree<IState, IRootState> = {}

export let actions: IActions<IState, IRootState> = {
  async getAccounts({ commit }) {
    try {
      const response = await fetch(`${env.baseUrl}/api/analytics/account`, {
        method: 'GET',
        credentials: 'include',
      })
      const json = await response.json()
      if (response.ok) {
        commit(types.SET_ACCOUNTS, json)
      } else {
        const error: FetchError = {
          status: response.status,
          statusText: response.statusText,
          message: json.message,
        }

        commit(types.SET_ACCOUNTS_ERROR, error)
      }
    } catch (error) {
      commit(types.SET_ACCOUNTS_ERROR, error)
    }
  },
}

export let mutations: MutationTree<IState> = {
  [types.SET_ACCOUNTS](s, accounts: IAnalyticAccount[]) {
    s.accounts = {
      state: FetchState.SUCCESS,
      error: undefined,
      data: accounts.map(
        (account): IAnalyticAccount => ({
          id: account.id,
          name: account.name,
          permissions: account.permissions,
          created: account.created,
          updated: account.updated,
        })
      ),
    }
  },
  [types.SET_ACCOUNTS_ERROR](s, error: FetchError) {
    s.accounts = {
      state: FetchState.ERROR,
      error,
      data: [],
    }
  },
}
