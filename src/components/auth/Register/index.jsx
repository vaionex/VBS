'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match.")
      return
    }
    // TODO: Register user logic here. (e.g., send data to API, Firebase, etc.)
  }

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In using Firebase here.
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
