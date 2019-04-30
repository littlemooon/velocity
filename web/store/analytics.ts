import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { FetchState, IFetchResult } from '../types'
import { fetchApi, setFetchResult } from '../utils/fetch.util'
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

export const name = 'analytics'
export const namespaced = true

export const types = {
  ACCOUNTS_SET: 'ACCOUNTS_SET',
}

export const initial = {
  accounts: { state: FetchState.INIT, data: [] },
}

export const state = (): IState => initial

export const getters: GetterTree<IState, IRootState> = {}

export const actions: IActions<IState, IRootState> = {
  async getAccounts({ commit }) {
    const result = await fetchApi<IAnalyticAccount[]>('/analytics/account')
    commit(types.ACCOUNTS_SET, result)
  },
}

export const mutations: MutationTree<IState> = {
  [types.ACCOUNTS_SET]: setFetchResult<IState, IAnalyticAccount[]>(
    'accounts',
    data =>
      data.map(
        (account: any): IAnalyticAccount => ({
          id: account.id,
          name: account.name,
          permissions: account.permissions,
          created: account.created,
          updated: account.updated,
        })
      )
  ),
}
