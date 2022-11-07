'use client'
import NextLink from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CheckCircleIcon,
  CursorArrowRaysIcon,
  Bars3Icon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import logo from '@/images/vbsLogo.png'

const solutions = [
  {
    name: 'Wallet',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Minting',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Data Push',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'View All Products', href: '#', icon: CheckCircleIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
  return (
    <Popover className="relative bg-white">
      <div
        className="absolute inset-0 z-30 shadow pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="flex items-center justify-between px-4 py-5 mx-auto max-w-7xl sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <NextLink href="/" className="flex">
              <span className="sr-only">Vaionex Logo</span>
              <Image
                className="w-auto h-8 sm:h-10"
                src={logo}
                alt="Vaionex"
                // width={100}
                // height={100}
                quality={80}
              />
            </NextLink>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <a
              href="https://docs.relysia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Docs
            </a>
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={twMerge(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      )}
                    >
                      <span>Features</span>
                      <ChevronDownIcon
                        className={twMerge(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500',
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel className="absolute inset-x-0 z-10 hidden transform bg-white shadow-lg md:block top-full">
                        <div className="grid px-4 py-6 mx-auto max-w-7xl gap-y-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                          {solutions.map((item) => (
                            <NextLink
                              key={item.name}
                              href={item.href}
                              className="flex flex-col justify-between p-2 -m-3 rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex md:h-full lg:flex-col">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center w-10 h-10 text-white bg-indigo-500 rounded-md sm:h-12 sm:w-12">
                                    <item.icon
                                      className="w-6 h-6"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                  <div>
                                    <p className="text-base font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>
                                  <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                    Learn more{' '}
                                    <span aria-hidden="true">&rarr;</span>
                                  </p>
                                </div>
                              </div>
                            </NextLink>
                          ))}
                        </div>
                        <div className="bg-gray-50">
                          <div className="px-4 py-5 mx-auto space-y-6 max-w-7xl sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                            {callsToAction.map((item) => (
                              <div key={item.name} className="flow-root">
                                <NextLink
                                  href={item.href}
                                  className="flex items-center p-2 -m-3 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3">{item.name}</span>
                                </NextLink>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                    width={100}
                    height={100}
                    priority
                    quality={80}
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {solutions.map((item) => (
                      <NextLink
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-md sm:h-12 sm:w-12">
                          <item.icon className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </NextLink>
                    ))}
                  </div>
                  <div className="mt-8 text-base">
                    <NextLink
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {' '}
                      View all products <span aria-hidden="true">&rarr;</span>
                    </NextLink>
                  </div>
                </nav>
              </div>
            </div>
            <div className="px-5 py-6">
              <div className="grid grid-cols-1 gap-4">
                <NextLink
                  href="/components"
                  className="flex justify-center py-2 text-base font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-700"
                >
                  Components
                </NextLink>
              </div>
              <div className="mt-6">
                <NextLink
                  href="/register"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </NextLink>
                <p className="mt-6 text-base font-medium text-center text-gray-500">
                  Existing customer?{' '}
                  <NextLink
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </NextLink>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
