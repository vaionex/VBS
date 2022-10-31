/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Image from "next/legacy/image";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

export const Avatar = ({
  size,
  avatarPathSetter,
  tempAvatarSetter,
  tempAvatar,
}) => {
  const auth = useSelector((state) => state.auth)
  const [uploading, setUploading] = useState(false)

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const blob = URL.createObjectURL(file)
      tempAvatarSetter(blob)
      avatarPathSetter({ filePath, file })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="p-2 flex justify-center">
        <div className="mb-8 rounded-full overflow-hidden w-14 h-14 ring ring-blue-400 ring-offset-base-100 ring-offset-2">
          <Image
            src={
              tempAvatar ??
              auth.user?.photoURL ??
              '/img/blank-profil-picture.png'
            }
            alt="Avatar"
            className="rounded-box"
            width={size}
            height={size}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <label
          className={`bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            uploading ? 'loading' : ''
          }`}
          htmlFor="single"
        >
          {uploading ? 'Uploading' : 'Upload Picture'}
        </label>
        <input
          className="hidden absolute"
          type="file"
          id="single"
          accept="image/*"
          onChange={(e) => uploadAvatar(e)}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

Avatar.propTypes = {
  size: PropTypes.number,
  avatarPathSetter: PropTypes.func,
  tempAvatarSetter: PropTypes.func,
  tempAvatar: PropTypes.string,
}

export default Avatar
