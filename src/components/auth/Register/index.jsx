'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { registerWithEmailAndPassword, signInWithGoogle } from '@/firebase/auth'
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const registrationFields = [
  {
    label: 'First name*',
    name: 'firstName',
    type: 'text',
    placeholder: '',
  },
  {
    label: 'Last name*',
    name: 'lastName',
    type: 'text',
    placeholder: '',
  },
  {
    label: 'Email*',
    name: 'email',
    type: 'email',
    placeholder: '',
  },
  {
    label: 'Password*',
    name: 'password',
    type: 'password',
    placeholder: '',
  },
  {
    label: 'Confirm Password*',
    name: 'confirmPassword',
    type: 'password',
    placeholder: '',
  },
]

export default function RegisterComponent() {
  const { push } = useRouter()
  const { authUser, updateUserData } = useFirebaseAuthContext()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: "Passwords don't match.",
      })
      return
    }
    const { email, password, firstName, lastName } = formData
    try {
      await registerWithEmailAndPassword(email, password, firstName, lastName)
      toast({
        variant: 'success',
        title: 'Successfully Registered',
        description: 'You have successfully registered. Welcome!',
      })
      push('/dashboard')
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      })
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    let res = await signInWithGoogle(authUser, updateUserData)
    if (res.status === 'success') {
      push('/dashboard')
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.message,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          {registrationFields.map((field) => (
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
          <Button type="submit" className="w-full mb-3">
            Register
          </Button>
          <Button type="button" onClick={handleGoogleSignIn} className="w-full">
            Sign up with Google
          </Button>
        </form>
      </div>
    </div>
  )
}
