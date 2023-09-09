'use client'
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext'
import Spinner from '@/components/Common/Spinner'

import Image from 'next/image'

export default function ProfileSetting() {
  const { isLoading } = useFirebaseAuthContext()

  if (!isLoading) {
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
        <div>components will be here.</div>
      </div>
    )
  } else {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }
}
