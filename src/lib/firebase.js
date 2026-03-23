import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDs2shwQp0XFcizdvTUpaCfUhmOIhK30Ek",
  authDomain: "fir-42a69.firebaseapp.com",
  projectId: "fir-42a69",
  storageBucket: "fir-42a69.firebasestorage.app",
  messagingSenderId: "663842711038",
  appId: "1:663842711038:web:cafdf241e491a7a3e54caf"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
