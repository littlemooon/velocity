import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { Fetch } from '../types'
import { fetchApi, setFetchResult } from '../utils/fetch.util'
import { State as RootState } from './index'

export type AnalyticPermissions =
  | 'COLLABORATE'
  | 'EDIT'
  | 'MANAGE_USERS'
  | 'READ_AND_ANALYZE'

export interface AnalyticAccount {
  id: string
  name: string
  permissions: {
    effective: AnalyticPermissions[]
  }
  created: string
  updated: string
}

export interface State {
  accounts: Fetch.Result<AnalyticAccount[]>
}

export interface Actions<S, R> extends ActionTree<S, R> {
  getAccounts(context: ActionContext<S, R>): void
}

export const name = 'analytics'
export const namespaced = true

export const types = {
  ACCOUNTS_SET: 'ACCOUNTS_SET',
}

export const initial = {
  accounts: { state: Fetch.State.INIT, data: [] },
}

export const state = (): State => initial

export const getters: GetterTree<State, RootState> = {
  account: (s, _, root) => {
    const accounts = s.accounts.data
    const accountId = root.route.params.account_id

    if (accounts) {
      return accounts.find(account => account.id === accountId)
    }
  },
}

export const actions: Actions<State, RootState> = {
  async getAccounts({ commit }) {
    const result = await fetchApi<AnalyticAccount[]>('/account')
    commit(types.ACCOUNTS_SET, result)
  },
}

export const mutations: MutationTree<State> = {
  [types.ACCOUNTS_SET]: setFetchResult<State, AnalyticAccount[]>(
    'accounts',
    data =>
      data.map(
        (account: any): AnalyticAccount => ({
          id: account.id,
          name: account.name,
          permissions: account.permissions,
          created: account.created,
          updated: account.updated,
        })
      )
  ),
}
