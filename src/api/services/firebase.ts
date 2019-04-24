import admin from 'firebase-admin'

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_SERVER_PRIVATE_KEY || 'x').replace(
      /\\n/g,
      '\n'
    ),
    projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
  }),
  databaseURL: process.env.FIREBASE_SERVER_DATABASE_URL,
})

export const store = firebase.firestore()
export let auth = firebase.auth()

export default firebase
