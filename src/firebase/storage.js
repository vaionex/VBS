import { getStorage } from 'firebase/storage'

import { firebase } from './app'

export const storage = getStorage(firebase)
