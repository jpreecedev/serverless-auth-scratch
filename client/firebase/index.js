import * as firebase from 'firebase'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAv0zPLVRxjflWQlSmE6LE522vlkkRyOho',
  authDomain: 'serverless-auth-scratch.firebaseapp.com',
  databaseURL: 'https://serverless-auth-scratch.firebaseio.com',
  projectId: 'serverless-auth-scratch',
  storageBucket: 'serverless-auth-scratch.appspot.com',
  messagingSenderId: '430675660094'
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export function authenticateUser() {
  return auth.signInWithPopup(provider)
}

export default firebase
