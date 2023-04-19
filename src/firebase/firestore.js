import { getFirestore } from 'firebase/firestore'

import { firebase } from './app'

export const firestore = getFirestore(firebase)
