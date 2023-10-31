'use client'

import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const SVG_PATH = '/icons'

const NAVIGATION = [
  {
    name: 'Profile',
    href: '/settings/profile',
    icon: 'user-03.svg',
    current: false,
  },
  {
    name: 'Plan and Billing',
    href: '/settings/billing',
    icon: 'credit-card-02.svg',
    current: false,
  },
  {
    name: 'Support',
    href: '/support',
    icon: 'life-buoy-01.svg',
    current: false,
  },
  {
    name: 'Docs',
    href: '/settings/docs',
    icon: 'file-code-02.svg',
    current: false,
  },
]

export default function SettingsSideBar() {
  const pathname = usePathname()

  const renderedItems = NAVIGATION.map((item) => (
    <li
      className={classNames(
        'hover:border-blue-500 border-l-4 border-white px-8 py-2 gap-y-1 flex flex-col',
        {
          'border-blue-500': item.href === pathname,
        },
      )}
      key={'settings_' + item.name}
    >
      <Link
        href={item.href}
        rel="canonical"
        className={classNames(
          'group flex items-center gap-x-3 leading-6 text-base	text-gray-700 ',
          {
            'font-medium': !item.href === pathname,
            'font-semibold	': item.href === pathname,
          },
        )}
      >
        <Image
          src={`${SVG_PATH}/${item.icon}`}
          alt={item.icon}
          height={24}
          width={24}
        />
        {item.name}
      </Link>
    </li>
  ))

  return (
    <div className="h-full justify-between border border-gray-200 bg-gray-50 rounded-xl pt-8 py-3 flex flex-col gap-y-6">
      <div>
        <div className="text-lg	text-gray-600 font-semibold px-8">Settings</div>
        <div className="mt-5">{renderedItems}</div>
      </div>
    </div>
  )
}
