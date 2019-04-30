import axios, { AxiosResponse } from 'axios'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { FetchState, IFetchResult } from '../types'
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
    console.log('-------------------- analytics --> ', 'getaccounts')
    try {
      const result = await axios.get('/api/analytics/account', {
        proxy: { host: '127.0.0.1', port: 3000 },
        withCredentials: true,
      })
      console.log('-------------------- analytics --> result', result)
      if (result) {
        commit(types.SET_ACCOUNTS, result)
      }
    } catch (error) {
      console.log('-------------------- analytics --> error', error)
      commit(types.SET_ACCOUNTS_ERROR, error)
    }
  },
}

export let mutations: MutationTree<IState> = {
  [types.SET_ACCOUNTS](s, accounts: AxiosResponse<IAnalyticAccount[]>) {
    s.accounts = {
      state: FetchState.SUCCESS,
      error: undefined,
      data: accounts.data.map(
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
  [types.SET_ACCOUNTS_ERROR](s, error: Error) {
    console.log('-------------------- analytics --> SET_ACCOUNTS_ERROR', {
      state: FetchState.ERROR,
      error,
      data: [],
    })
    s.accounts = {
      state: FetchState.ERROR,
      error,
      data: [],
    }
  },
}
