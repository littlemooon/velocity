import { Fetch } from '~/types'

export namespace Ui {
  export interface Notification {
    id: string
    level: 'error' | 'warn' | 'info'
    title: string
    text: string | Fetch.Error | Error
  }
}
