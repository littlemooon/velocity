import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { Api, Fetch } from '../types'
import { fetchApi, setFetchResult } from '../utils/fetch.util'
import { State as RootState } from './index'

export type Account = Api.Db<Api.Account>

export interface State {
  accounts: Fetch.Result<Account[]>
}

export interface Actions<S, R> extends ActionTree<S, R> {
  getAccounts(context: ActionContext<S, R>): void
}

export const name = 'account'
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
    const result = await fetchApi<Account[]>('/account')
    commit(types.ACCOUNTS_SET, result)
  },
}

export const mutations: MutationTree<State> = {
  [types.ACCOUNTS_SET]: setFetchResult<State, Account[]>('accounts'),
}
