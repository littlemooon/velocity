import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { IState as IRootState } from './index'

export interface IPersonContact {
  email: string
  phone: string
}

export interface IPersonAddress {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}

export interface IPerson {
  id: number
  first_name: string
  last_name: string
  contact: IPersonContact
  gender: string
  ip_address: string
  avatar: string
  address: IPersonAddress
}

export interface IState {
  selected: number
  people: IPerson[]
}

export interface IActions<S, R> extends ActionTree<S, R> {
  select(context: ActionContext<S, R>, id: number): void
}

export let name = 'people'
export let namespaced = true

export let types = {
  SELECT: 'SELECT',
  SET: 'SET',
}

export let state = (): IState => ({
  selected: 1,
  people: [],
})

export let getters: GetterTree<IState, IRootState> = {
  selectedPerson: s => {
    const p = s.people.find(person => person.id === s.selected)
    return p ? p : { first_name: 'Please,', last_name: 'select someone' }
  },
}

export let actions: IActions<IState, IRootState> = {
  select({ commit }, id: number) {
    commit(types.SELECT, id)
  },
}

export let mutations: MutationTree<IState> = {
  [types.SELECT](s, id: number) {
    s.selected = id
  },
  [types.SET](s, people: IPerson[]) {
    s.people = people
  },
}
