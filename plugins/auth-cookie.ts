// import * as firebase from '../services/firebase'
// import { Plugin } from '../types'

// const authCookie: Plugin = () => {
//   firebase.auth.onAuthStateChanged(async user => {
//     const token = user ? await user.getIdToken() : ''
//     document.cookie = `__session=${token};path=/;max-age=${token ? 3600 : 0}`
//   })
// }

// export default authCookie
