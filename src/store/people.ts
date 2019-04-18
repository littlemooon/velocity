import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { State as RootState } from '~/store/index'

export let name = 'people'

export let types = {
  SELECT: 'SELECT',
  SET: 'SET',
}

export interface PersonContact {
  email: string
  phone: string
}

export interface PersonAddress {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}

export interface Person {
  id: number
  first_name: string
  last_name: string
  contact: PersonContact
  gender: string
  ip_address: string
  avatar: string
  address: PersonAddress
}

export interface State {
  selected: number
  people: Person[]
}

export let namespaced = true

export let state = (): State => ({
  selected: 1,
  people: [],
})

export let getters: GetterTree<State, RootState> = {
  selectedPerson: s => {
    let p = s.people.find(person => person.id === s.selected)
    return p ? p : { first_name: 'Please,', last_name: 'select someone' }
  },
}

export interface Actions<S, R> extends ActionTree<S, R> {
  select(context: ActionContext<S, R>, id: number): void
}

export let actions: Actions<State, RootState> = {
  select({ commit }, id: number) {
    commit(types.SELECT, id)
  },
}

export let mutations: MutationTree<State> = {
  [types.SELECT](s, id: number) {
    s.selected = id
  },
  [types.SET](s, people: Person[]) {
    s.people = people
  },
}
