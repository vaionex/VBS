import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebase } from './app'

let storage
if (firebase) {
  storage = getStorage(firebase)
}

export { storage }

export const uploadProfileImage = async (userId, file) => {
  try {
    const storageRef = ref(storage, `users/${userId}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    return downloadUrl
  } catch (error) {
    throw error
  }
}
