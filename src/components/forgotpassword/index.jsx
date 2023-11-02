'use client'
import { useState } from 'react'
import { Button } from '@/components/UI/button'
import { Label } from '@/components/UI/label'
import { Input } from '@/components/UI/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from '@/components/UI/use-toast'
import { useAuth } from '@/hooks/useAuth'

export default function ForgotPasswordComponent() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()
  const { resetPassword } = useAuth()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await resetPassword(email)
      toast({
        title: 'Success',
        description: 'Password reset email sent successfully.',
      })
      push('/login')
    } catch (error) {
      console.error('Error updating password:', error)

      let errorMessage = 'An error occurred'
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Incorrect email. Please try again.'
          break
        case 'auth/missing-android-pkg-name':
          errorMessage = 'Please install android app.'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found.'
          break
        default:
          break
      }

      toast({
        title: 'Error',
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mx-auto w-full max-w-sm lg:w-96 mb-6">
          <Image
            src="./building.svg"
            height={60}
            width={72}
            className="mx-auto"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mb-3">
            {isLoading ? 'Loading...' : 'Reset Password'}
          </Button>
        </form>

        <div className="text-sm leading-6">
          <Link
            href="/login"
            className="text-gray font-semibold text-gray-600 hover:text-gray-500"
          >
            Back to Login Page?
          </Link>
        </div>
      </div>
    </div>
  )
}
