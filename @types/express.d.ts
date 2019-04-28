/// <reference types="node" />

declare namespace Express {
  export interface Session {
    user?: {
      id: string
    }
    tokens?: {
      access_token: string
    }
  }

  // export interface Request {
  //   log: {
  //     info: (a: string, b: any) => void
  //     warn: (a: string, b: any) => void
  //     error: (a: string, b: any) => void
  //   }
  // }
}
