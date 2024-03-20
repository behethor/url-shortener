import { isValidHttpUrl, createRandomString } from '../utils/url.js'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export class ShortenerModel {
  static async getById ({ id }) {
    if (!isValidHttpUrl(id)) {
      return null
    }

    let url = ''
    const querySnapshot = await getDocs(collection(db, 'urls'))
    querySnapshot.forEach((doc) => {
      if (doc.data().shortUrl === id) {
        url = doc.data().url
      }
    })

    if (url.length === 0) {
      return null
    }

    return { url }
  }

  static async create ({ url, baseUrl }) {
    if (!isValidHttpUrl(url)) {
      return null
    }

    const randomString = createRandomString()
    const shortenedUrl = `${baseUrl}/${randomString}`

    const docRef = await addDoc(collection(db, 'urls'), {
      url,
      shortUrl: shortenedUrl,
      id: randomString
    })

    if (!docRef?.id) {
      return null
    }

    return {
      shortUrl: shortenedUrl
    }
  }
}
