import fetch from 'isomorphic-fetch'
import env from '../env'
import { Fetch } from '../types'

let ssrCookies: string | undefined

export function setFetchCookies(cookies: object) {
  ssrCookies = Object.entries(cookies).reduce((acc, [key, value]) => {
    return `${acc};${key}=${value}`
  }, '')
}

export function setFetchInit<S>(key: string) {
  return (store: S) => {
    store[key] = {
      state: Fetch.State.INIT,
    }
  }
}

export function setFetchLoading<S>(key: string) {
  return (store: S) => {
    store[key] = {
      state: Fetch.State.LOADING,
    }
  }
}

export function setFetchResult<S, T>(
  key: string,
  dataTransform?: (data: any) => T
) {
  return (store: S, result: Fetch.Result<T>) => {
    const data = result.data
    store[key] = {
      ...result,
      data: data && dataTransform ? dataTransform(data) : data,
    }
  }
}

export async function fetchApi<T>(
  uri: string,
  options: RequestInit = {}
): Promise<Fetch.Result<T>> {
  try {
    const headers = { cookie: ssrCookies, ...options.headers } as any

    const response = await fetch(`${env.webUrl}/api${uri}`, {
      method: 'GET',
      credentials: 'same-origin',
      ...options,
      headers,
    })

    const json = await response.json()

    if (response.ok) {
      return {
        state: Fetch.State.SUCCESS,
        data: json,
      }
    } else {
      const error = {
        status: response.status,
        statusText: response.statusText,
        message: json.message,
      }
      console.log('API ERROR', error)
      return {
        state: Fetch.State.ERROR,
        error,
      }
    }
  } catch (error) {
    console.log('API CATCH', error)
    return {
      state: Fetch.State.ERROR,
      error:{
        status: undefined,
        statusText: 'Client Error',
        message: error && error.message,
      },
    }
  }
}
