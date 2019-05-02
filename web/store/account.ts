import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { AccountProfile, AccountProperty } from '../../api/types'
import { Api, Fetch, Ui } from '../types'
import { fetchApi, setFetchResult } from '../utils/fetch.util'
import { State as RootState } from './index'
import * as ui from './ui'

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

export interface SelectedParams {
  accountId?: string
  propertyId?: string
  profileId?: string
}

export interface Getters {
  selected: SelectedParams
  account: Account | undefined
  property: AccountProperty | undefined
  profile: AccountProfile | undefined
}

export const getters: GetterTree<State, RootState> = {
  selected(_, __, root): SelectedParams {
    return {
      accountId: root.route.params.account_id,
      propertyId: root.route.params.property_id,
      profileId: root.route.params.profile_id,
    }
  },

  account(s, { selected }: Getters): Account | undefined {
    const accounts = s.accounts.data
    if (accounts && selected.accountId) {
      return accounts.find(account => account.providerId === selected.accountId)
    }
  },

  property(_, { account, selected }: Getters): AccountProperty | undefined {
    const properties = account && account.properties
    if (properties && selected.propertyId) {
      return properties.find(
        property => property.providerId === selected.propertyId
      )
    }
  },

  profile(_, { property, selected }: Getters): AccountProfile | undefined {
    const profiles = property && property.profiles

    if (profiles && selected.profileId) {
      return profiles.find(profile => profile.providerId === selected.profileId)
    }
  },

  breadcrumbs: (
    _,
    { account, property, profile }: Getters
  ): Ui.Breadcrumb[] => {
    const crumbs: Ui.Breadcrumb[] = []

    if (account) {
      const accountPath = (a: string[]) => ['/a', ...a].join('/')

      if (property) {
        crumbs.push({
          name: property.name || 'Property',
          to: accountPath([account.providerId, property.providerId]),
        })

        if (profile) {
          crumbs.push({
            name: profile.name || 'Profile',
            to: accountPath([
              account.providerId,
              property.providerId,
              profile.providerId,
            ]),
          })
        }
      }
    }

    return crumbs
  },
}

export const actions: Actions<State, RootState> = {
  async getAccounts({ commit, dispatch }) {
    const result = await fetchApi<Account[]>('/account')
    commit(types.ACCOUNTS_SET, result)

    if (result.error) {
      dispatch(
        `${ui.name}/addNotification`,
        {
          level: 'error',
          text: 'Failed to get Accounts',
          error: result.error,
        },
        { root: true }
      )
    }

    dispatch(`${ui.name}/removeLoading`, 'getAccounts', { root: true })
  },
}

export const mutations: MutationTree<State> = {
  [types.ACCOUNTS_SET]: setFetchResult<State, Account[]>('accounts'),
}
