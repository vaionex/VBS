'use client'
import React, { useState } from 'react'
// import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const loginFields = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: '',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '',
  },
]
export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // TODO: Login user logic here. (e.g., send data to API, Firebase, etc.)
  }

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In using Firebase here.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mx-auto w-full max-w-sm lg:w-96 mb-6">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              class="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </div>
        <form onSubmit={handleLogin}>
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
          <Button type="submit" className="w-full mb-3">
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
