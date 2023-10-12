'use client'
import React, { useState } from 'react'
import { Input } from '@/components/UI/input'
import { Button } from '@/components/UI/button'
import { Label } from '@/components/UI/label'
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext'
import { signInWithGoogle, signInWithEmail } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Checkbox } from '@/components/UI/checkbox'
import { useToast } from '@/components/UI/use-toast'
import SpinnerComponent from '@/components/Common/Spinner'

const loginFields = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    id: 'email',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
    minLength: '8',
    id: 'password',
  },
]

export default function LoginComponent() {
  const { authUser, updateUserData } = useFirebaseAuthContext()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { push } = useRouter()
  const [isChecked, setIsChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleEmailSignIn = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      await signInWithEmail(formData, isChecked)
      push('/')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      let errorMessage = ''

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found.'
          break
        case 'auth/network-request-failed':
          errorMessage =
            'Network error. Please check your internet connection and try again.'
          break
        default:
          errorMessage = 'An error occurred during sign in. Please try again.'
          break
      }

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorMessage,
      })
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    let res = await signInWithGoogle(authUser, updateUserData)
    if (res.status === 'success') {
      push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mx-auto w-full max-w-sm lg:w-96 mb-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              src="./mark.svg"
              height={60}
              width={72}
              className="mx-auto"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </div>
        <form onSubmit={handleEmailSignIn}>
          {loginFields.map((field) => (
            <div className="mb-4" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                type="checkbox"
              />
              <Label
                htmlFor="remember-me"
                className="ml-3 block text-sm font-medium leading-6 text-gray-700"
              >
                Remember me
              </Label>
            </div>

            <div className="text-sm leading-6 ">
              <Link
                href="/forgot-password"
                rel="canonical"
                className="text-gray font-semibold text-gray-600 hover:text-gray-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full mb-3">
            {isLoading && (
              <SpinnerComponent className="text-white absolute left-4" />
            )}
            Login
          </Button>
          <Button type="button" onClick={handleGoogleSignIn} className="w-full">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  )
}
