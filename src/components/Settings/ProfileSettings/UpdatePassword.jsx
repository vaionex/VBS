import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { KeyRound, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/UI/input'
import { Button } from '@/components/UI/button'
import { Label } from '@/components/UI/label'
import { useToast } from '@/components/UI/use-toast'
import SpinnerComponent from '@/components/Common/Spinner'

const UpdatePassword = ({ authUser }) => {
  const { toast } = useToast()
  const { updateUserPassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false)
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdatePassword = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmNewPassword) {
      toast({ description: 'Passwords do not match. Please try again.' })
      return
    }

    if (newPassword === currentPassword) {
      toast({ description: 'You cannot reuse your previous password.' })
      return
    }

    setIsLoading(true)

    try {
      await updateUserPassword(authUser?.email, currentPassword, newPassword)
      toast({ description: 'Password updated successfully.' })
    } catch (error) {
      console.error('Error updating password:', error)

      let errorMessage = 'An error occurred'
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/weak-password':
          errorMessage =
            'Password is too weak. Please choose a stronger password.'
          break
        case 'auth/requires-recent-login':
          errorMessage = 'Please reauthenticate and try again.'
          break
        case 'auth/invalid-password':
          errorMessage = 'Invalid password. Please try again.'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please check the email address.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.'
          break
        default:
          break
      }
      toast({ description: `${error.code} ${errorMessage}` })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (setState) => {
    setState((prevState) => !prevState)
  }

  return (
    <form className="p-6 mt-4" onSubmit={handleUpdatePassword}>
      <div className="pb-4">
        <div className="space-y-12 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-8 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Update Password
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Update your account password.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full ">
                <Label htmlFor="current-password">Current password</Label>

                <div className="mt-2 sm:col-span-3 relative input-with-icon">
                  <KeyRound className="h-5 w-5 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  <Input
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    placeholder="Current password"
                    id="current-password"
                    type={currentPasswordVisible ? 'text' : 'password'}
                    autoComplete="password"
                    className="block w-full py-1.5 pl-10 pr-12"
                    required
                    minLength="8"
                  />
                  {currentPassword.length > 0 && (
                    <div
                      onClick={() =>
                        togglePasswordVisibility(setCurrentPasswordVisible)
                      }
                      className="password-toggle absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {currentPasswordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-full ">
                <Label htmlFor="new-password">New password</Label>

                <div className="mt-2 sm:col-span-3 relative input-with-icon">
                  <KeyRound className="h-5 w-5 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder="New password"
                    id="new-password"
                    type={newPasswordVisible ? 'text' : 'password'}
                    autoComplete="password"
                    className="block w-full py-1.5 pl-10 pr-12"
                    required
                    minLength="8"
                  />
                  {newPassword.length > 0 && (
                    <div
                      onClick={() =>
                        togglePasswordVisibility(setNewPasswordVisible)
                      }
                      className="password-toggle absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {newPasswordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-full ">
                <Label htmlFor="first-name">Confirm New password</Label>

                <div className="mt-2 sm:col-span-3 relative input-with-icon">
                  <KeyRound className="h-5 w-5 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  <Input
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                    placeholder="Confirm new password"
                    id="confirm-password"
                    type={confirmNewPasswordVisible ? 'text' : 'password'}
                    autoComplete="password"
                    className="block w-full py-1.5 pl-10 pr-12"
                    required
                    minLength="8"
                  />
                  {confirmNewPassword.length > 0 && (
                    <div
                      onClick={() =>
                        togglePasswordVisibility(setConfirmNewPasswordVisible)
                      }
                      className="password-toggle absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {confirmNewPasswordVisible ? (
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
            className="rounded-md px-4 py-2.5"
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

export default UpdatePassword
