export namespace Fetch {
  export enum State {
    INIT = 'INIT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }

  export interface Error {
    status?: number
    statusText: string
    message?: string
  }

  export interface Result<T> {
    state: State
    error?: Error
    data?: T
  }
}
