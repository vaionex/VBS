import React, { useState, useRef } from 'react'
import { UserCircle, Camera } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/UI/input'
import { Button } from '@/components/UI/button'
import { Label } from '@/components/UI/label'
import { useToast } from '@/components/UI/use-toast'
import SpinnerComponent from '@/components/Common/Spinner'
import Image from 'next/image'

export default function UpdateProfile({ authUser, updateUserData }) {
  const { toast } = useToast()
  const {
    updateUserProfile,
    updateUserDocs,
    updateCustomerData,
    uploadProfileImage,
  } = useAuth()
  const [firstName, setFirstName] = useState(authUser?.firstName || '')
  const [lastName, setLastName] = useState(authUser?.lastName || '')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(authUser?.photoURL || '')
  const [imageFile, setImageFile] = useState(null)

  const fileInputRef = useRef(null)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let updatedObj = {}

      console.log(updatedObj, 'updateObj 1')
      if (firstName !== authUser?.firstName) {
        console.log(authUser.uid, 'authUser.uid')
        console.log(updateUserData)
        await updateUserDocs(authUser.uid, { firstName })
        await updateCustomerData(authUser.uid, { firstName })
        updatedObj.firstName = firstName
      }
      if (lastName !== authUser?.lastName) {
        await updateUserDocs(authUser.uid, { lastName })
        await updateCustomerData(authUser.uid, { lastName })
        updatedObj.lastName = lastName
        console.log(updatedObj, 'updatedObj 3')
        console.log(updatedObj.lastName, 'lastname')
      }

      if (imageFile) {
        const fileUrl = await uploadProfileImage(authUser.uid, imageFile)
        await updateUserProfile({ photoURL: fileUrl })
        updatedObj.photoURL = fileUrl + '?t=' + new Date().getTime()
      }

      updateUserData(updatedObj)
      toast({ description: 'Profile updated successfully.' })
      setFirstName('')
      setLastName('')
    } catch (err) {
      console.log('err at handleUpdateProfile', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
        setImageFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form className="p-6 mt-4" onSubmit={handleUpdateProfile}>
      <div className="border-b border-gray-900/10 pb-6">
        <div className="space-y-12 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-8 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                User Profile
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage user profile details.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <Label htmlFor="first-name">First name</Label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="Enter your firstname"
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full py-1.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="last-name">Last name</Label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Enter your lastname"
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full py-1.5"
                  />
                </div>
              </div>

              <div className="col-span-full ">
                <Label htmlFor="email">Profile image</Label>
                <div className="mt-2 flex">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      fileInputRef.current.click()
                    }}
                  >
                    {selectedImage ? (
                      <Image
                        className="w-20 h-20 rounded-full bg-white"
                        src={selectedImage}
                        alt="profile image"
                        width={80}
                        height={80}
                        loading="lazy"
                        quality="85"
                        onError={() => {
                          console.log('err img')
                          setSelectedImage('')
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserCircle className="stroke-1 w-18 h-18 text-white" />
                      </div>
                    )}
                    <div className="bg-[#344054] bg-opacity-50 p-2 rounded-xl absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <Input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            className="px-4 py-2"
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
