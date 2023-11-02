'use client'

import { useAuth } from '@/hooks/useAuth'
import UpdateEmail from './UpdateEmail'
import UpdatePassword from './UpdatePassword'
import UpdateProfile from './UpdateProfile'
import Image from 'next/image'
import SpinnerComponent from '@/components/Common/Spinner'

export default function ProfileSetting() {
  const { authUser, updateUserData, isLoading } = useAuth()

  if (!isLoading && authUser) {
    return (
      <div>
        <div className="py-4 px-6 gap-x-3 flex items-center text-lg">
          <Image
            src="/building.svg"
            alt="Featured Icon"
            width={32}
            height={32}
            className="m-2"
          />
          <h3 className="text-lg font-semibold text-gray-600">
            Profile Setting
          </h3>
        </div>
        <hr className="border-gray-200" />
        <div>
          <UpdateProfile authUser={authUser} updateUserData={updateUserData} />
          <UpdateEmail authUser={authUser} updateUserData={updateUserData} />
          <UpdatePassword authUser={authUser} updateUserData={updateUserData} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="h-full flex justify-center items-center">
        <SpinnerComponent />
      </div>
    )
  }
}
