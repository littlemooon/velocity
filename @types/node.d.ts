/// <reference types="node" />

declare namespace NodeJS {
  export interface Process {
    client: boolean
    server: boolean
  }
}
