import { useState } from 'react'
import { updateEmailAddress } from '@/firebase/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/UI/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/UI/use-toast'
import SpinnerComponent from '@/components/Common/Spinner'
import { KeyRound, Mail, Eye, EyeOff } from 'lucide-react'

const UpdateEmail = ({ authUser, updateUserData }) => {
  const { toast } = useToast()
  const [email, setEmail] = useState(authUser?.email)
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateEmail = async (e) => {
    e.preventDefault()

    if (email === authUser?.email) {
      toast({ description: 'Please provide a different email to update.' })
      return
    }

    setIsLoading(true)

    try {
      await updateEmailAddress(authUser?.email, password, email)
      toast({ description: 'Email updated successfully.' })
      updateUserData({ email })
    } catch (error) {
      console.error('Error updating email address:', error)

      let errorMessage = 'An error occurred'
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please check your email and password.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.'
          break
        case 'auth/requires-recent-login':
          errorMessage = 'Please log in again to update your email.'
          break
        case 'auth/email-already-in-use':
          errorMessage =
            'Email already in use. Please choose a different email.'
          break
        default:
          break
      }

      toast({ description: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState)
  }

  return (
    <form className="p-6 mt-4" onSubmit={handleUpdateEmail}>
      <div className="border-b border-gray-900/10 pb-6">
        <div className="space-y-12 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-8 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Update Email
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Update your email address.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full ">
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2 flex input-with-icon relative">
                  <Mail className="h-5 w-5 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />

                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email address"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md py-1.5 px-10 pl-10  "
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <Label htmlFor="email">Password</Label>

                <div className="mt-2 sm:col-span-3 relative input-with-icon">
                  <KeyRound className="h-5 w-5 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Current password"
                    id="set-password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="password"
                    className="block w-full pl-10 pr-12 "
                    required
                    minLength="8"
                  />
                  {password.length > 0 && (
                    <div
                      onClick={togglePasswordVisibility}
                      className="password-toggle absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            className=" px-4 py-2.5  "
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? <SpinnerComponent /> : 'Update'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default UpdateEmail
