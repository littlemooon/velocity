import Cookies from 'js-cookie'
import { Omit } from 'type-fest'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { Ui } from '../types'
import { uuid } from '../utils/index.util'
import { State as RootState } from './index'

export interface Nav {
  open: boolean
}

export interface State {
  nav: Nav
  loadingIds: string[]
  notifications: Ui.Notification[]
}
export interface Actions<S, R> extends ActionTree<S, R> {
  setNav(context: ActionContext<S, R>, open: boolean): void
  addNotification(
    context: ActionContext<S, R>,
    notification: Omit<Ui.Notification, 'id'>
  ): void
  removeNotification(context: ActionContext<S, R>, id: string): void
  addLoading(context: ActionContext<S, R>, id: string): void
  removeLoading(context: ActionContext<S, R>, id: string): void
}

export const name = 'ui'
export const namespaced = true

export const cookies = { navClosed: 'nav_closed' }

export const initial: State = {
  nav: { open: true },
  loadingIds: [],
  notifications: [],
}

export const state = (): State => initial

export const getters: GetterTree<State, RootState> = {
  loading: s => {
    return Boolean(s.loadingIds.length)
  },
}

const actionKey = {
  setNav: 'setNav',
  addLoading: 'addLoading',
  addNotification: 'addNotification',
  removeNotification: 'removeNotification',
}

const mutationKey = {
  NAV_SET: 'NAV_SET',
  LOADING_ADD: 'LOADING_ADD',
  LOADING_REMOVE: 'LOADING_REMOVE',
  NOTIFICATION_ADD: 'NOTIFICATION_ADD',
  NOTIFICATION_REMOVE: 'NOTIFICATION_REMOVE',
}

export const actions: Actions<State, RootState> = {
  async setNav({ commit }, open) {
    if (open) {
      Cookies.remove(cookies.navClosed)
    } else {
      Cookies.set(cookies.navClosed, 'true')
    }

    commit(mutationKey.NAV_SET, { open })
  },
  addLoading({ commit }, id) {
    commit(mutationKey.LOADING_ADD, id)
  },
  removeLoading({ commit }, id) {
    commit(mutationKey.LOADING_REMOVE, id)
  },
  addNotification({ commit, dispatch }, notification) {
    const id = uuid()
    commit(mutationKey.NOTIFICATION_ADD, { id, ...notification })

    const timeout =
      notification.level === 'error'
        ? 20000
        : notification.level === 'warn'
        ? 10000
        : 6000
    setTimeout(() => dispatch(actionKey.removeNotification, id), timeout)
  },
  removeNotification({ commit }, id) {
    commit(mutationKey.NOTIFICATION_REMOVE, id)
  },
}

export const mutations: MutationTree<State> = {
  [mutationKey.NAV_SET](s, nav: Nav) {
    s.nav = nav
  },
  [mutationKey.LOADING_ADD](s, id: string) {
    s.loadingIds = [...s.loadingIds, id]
  },
  [mutationKey.LOADING_REMOVE](s, id: string) {
    s.loadingIds = s.loadingIds.filter(x => x !== id)
  },
  [mutationKey.NOTIFICATION_ADD](s, notification: Ui.Notification) {
    s.notifications = [...s.notifications, notification]
  },
  [mutationKey.NOTIFICATION_REMOVE](s, id: string) {
    s.notifications = s.notifications.filter(n => n.id !== id)
  },
}
