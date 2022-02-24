/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { firebaseLogin, firebaseLoginWithGoogle } from '@/firebase/utils'
import { useState } from 'react'

import { FormInput } from '@/components/ui'

import { useDispatch } from 'react-redux'
import { setUserData, setAuthenticated } from '@/redux/slices/auth'

const inputAttributes = [
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    label: 'Email',
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    label: 'Password',
  },
]

function LoginForm() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    firebaseLogin(formData)
  }

  const handleGoogleAuth = async () => {
    // eslint-disable-next-line no-undef
    const userInfo = await firebaseLoginWithGoogle()
    if (userInfo) {
      dispatch(setUserData(userInfo.displayName))
      dispatch(setAuthenticated())
    }
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="h-12 w-auto mx-auto sm:h-10"
          src="https://i.ibb.co/4jWbzz7/vbsLogo.png"
          alt="vaionex-logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {inputAttributes.map((inputAttribute) => (
              <FormInput
                key={inputAttribute.name}
                {...inputAttribute}
                value={formData[inputAttribute.name]}
                onChange={handleChange}
              />
            ))}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => handleGoogleAuth()}
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 520 520"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M380.9 211.2c37 0 74 .1 111-.1 4.3 0 6 1.5 6.7 5.3 4.6 23.7 5.4 47.4 2.8 71.5-2.3 21.6-6.4 42.7-13.6 63.2-14.7 41.8-38.7 76.9-73.6 104.6-32.3 25.6-68.9 41.5-109.3 47.9-48.9 7.7-96.5 1.9-142-18.2-29.7-13.1-55.9-31.4-78.4-54.8-25.1-26.2-43.7-56.4-55.8-90.7-11.2-31.9-15.4-64.7-13.5-98.2 2.4-42.1 14.9-81.2 37.3-117.1 20.7-33.3 47.7-60.1 81-80.6 29.1-17.9 60.7-29.3 94.6-34.1 37.3-5.3 74-2.8 110 8.4C371 28.6 400.6 45.2 427 67.6c2.5 2.1 1.2 3-.3 4.5-22.6 22.6-45.2 45.2-67.8 67.9-1.7 1.7-2.8 2-5 .4-23.6-18.4-50.3-28.8-80.3-30.5-39.5-2.3-74.4 9.3-104.7 34.8-26.5 22.3-42.9 50.6-49.2 84.5-7.5 40.5.3 78 23.8 112.1 22.1 32 52.5 52 90.4 60 34.5 7.3 68.2 3.6 100.3-11.3 33.3-15.5 54.2-41.4 63.2-77 1.1-4.4-.1-5-4.1-5-41.2.1-82.3 0-123.5.2-4.3 0-5.7-.9-5.6-5.5.2-28.5.2-57 0-85.5 0-5 1.7-6 6.3-6 36.7.1 73.6 0 110.4 0z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
