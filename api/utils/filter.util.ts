export function filterArray<T>(arr: Array<T | null | undefined>): T[] {
  return arr.filter(Boolean) as T[]
}

export function filterObj<T>(object: T) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) {
      delete object[key]
    }
  }
  return object
}
