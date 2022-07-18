import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'

import Avatar from '../settings-parts/pic-upload'
import {
  firebaseUpdateProfilePicture,
  firebaseUpdateProfilDetails,
} from '@/firebase/utils'
import Notification from '@/components/ui/notification'

export default function Settings() {
  const router = useRouter()
  const [tempAvatarUrl, setTempAvatarUrl] = useState(null)
  const [avatarPath, setAvatarPath] = useState(null)
  const [loading, setLoading] = useState(false)
  const [infoLoading, setInfoLoading] = useState(false)
  const [popup, setPopup] = useState({
    message: '',
    messageType: '',
    state: false,
  })
  const auth = useSelector((state) => state.auth)
  const authUser = getAuth()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateProfilePicture = async (e) => {
    e.preventDefault()
    setLoading(true)
    const updateData = {
      user: authUser.currentUser,
      file: avatarPath?.file,
      filePath: `avatars/${auth.user.uid}/${avatarPath?.filePath}`,
    }
    const returnFromUpdate = await firebaseUpdateProfilePicture({
      ...updateData,
    })
    setTempAvatarUrl(null)
    setAvatarPath(null)
    setLoading(false)
    if (returnFromUpdate?.message === 'successful') {
      setPopup(() => ({
        message: 'Profile image changed successful.',
        messageType: 'success',
        state: true,
      }))
    } else {
      setPopup(() => ({
        message: 'Please upload a suitable picture.',
        messageType: 'fail',
        state: true,
      }))
    }
  }

  const updateProfileDetails = async (e) => {
    e.preventDefault()
    setInfoLoading(true)
    let newPassword = null
    let newUsername = null
    let newEmail = null
    if (formData.password.length > 0) {
      if (formData.password.length < 6) {
        setPopup(() => ({
          message: 'Password min length should be 6.',
          messageType: 'fail',
          state: true,
        }))
        setInfoLoading(false)
        return
      } else if (formData.password !== formData.confirmPassword) {
        setPopup(() => ({
          message: 'Password and confirm password should be same.',
          messageType: 'fail',
          state: true,
        }))
        setInfoLoading(false)
        return
      } else {
        newPassword = formData.password
      }
    }
    if (formData.username.length > 0) {
      if (formData.username.length < 4) {
        setPopup(() => ({
          message: 'Username min length should be 4.',
          messageType: 'fail',
          state: true,
        }))
        setInfoLoading(false)
        return
      } else {
        newUsername = formData.username
      }
    }
    if (formData.email.length > 0) {
      if (formData.email === auth.user.email) {
        setPopup(() => ({
          message:
            'Be sure to enter an email that is different from your current email address',
          messageType: 'fail',
          state: true,
        }))
        setInfoLoading(false)
        return
      } else {
        newEmail = formData.email
      }
    }
    if (!newPassword && !newUsername && !newEmail) {
      setPopup(() => ({
        message: "You've made no changes",
        messageType: 'fail',
        state: true,
      }))
      setInfoLoading(false)
      return
    }
    await firebaseUpdateProfilDetails({
      user: authUser.currentUser,
      password: newPassword,
      username: newUsername,
      email: newEmail,
      photoURL: auth.user.photoURL,
    }).then(() => {
      setPopup(() => ({
        message: 'The changes were successful',
        messageType: 'success',
        state: true,
      }))
    })
    setInfoLoading(false)
  }

  return (
    <>
      <form
        className="py-10 w-full px-2 sm:px-0 max-w-3xl lg:max-w-7xl mx-auto space-y-8 divide-y divide-gray-200"
        onSubmit={(e) => updateProfilePicture(e)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Avatar
                      size={70}
                      tempAvatarSetter={setTempAvatarUrl}
                      avatarPathSetter={setAvatarPath}
                      tempAvatar={tempAvatarUrl}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 mr-2">
          <div className="flex justify-end">
            <button
              onClick={() => router.reload()}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <>
                  <svg
                    role="status"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </form>

      <form
        className="py-10 w-full px-2 sm:px-0 max-w-3xl lg:max-w-7xl mx-auto space-y-8 divide-y divide-gray-200"
        onSubmit={(e) => updateProfileDetails(e)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    placeholder={auth.user.name}
                    name="username"
                    id="username"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="email"
                    placeholder={auth.user.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    id="password"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Confirm Password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    id="confirm-password"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 mr-2">
          <div className="flex justify-end">
            <button
              onClick={() => router.reload()}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {infoLoading ? (
                <>
                  <svg
                    role="status"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </form>
      {popup.state && (
        <Notification
          setter={setPopup}
          bool={popup.state}
          message={popup.message}
          type={popup.messageType}
        />
      )}
    </>
  )
}
