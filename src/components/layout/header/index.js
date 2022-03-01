/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { Popover, Transition, Menu } from '@headlessui/react'
import { marketing, applicationUi, ecommerce } from '@/constants/navbarElements'
import {
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { setResetAuth } from '@/redux/slices/auth'
import { fireBaseSignOut } from '@/firebase/init'

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
    icon: CursorClickIcon,
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
    icon: ViewGridIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'View All Products', href: '#', icon: CheckCircleIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

const userNavigation = [
  { name: 'Your Profile', href: '/user-profile' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const signOut = async () => {
    await fireBaseSignOut()
    dispatch(setResetAuth())
  }

  return (
    <Popover className="relative bg-white">
      <div
        className="absolute inset-0 shadow z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <a href="/" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://i.ibb.co/4jWbzz7/vbsLogo.png"
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <a
              href="https://docs.relysia.com"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Docs
            </a>
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      )}
                    >
                      <span>Features</span>
                      <ChevronDownIcon
                        className={classNames(
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
                      <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                        <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-2 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex md:h-full lg:flex-col">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                    <item.icon
                                      className="h-6 w-6"
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
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50">
                          <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                            {callsToAction.map((item) => (
                              <div key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                >
                                  <item.icon
                                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3">{item.name}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      )}
                    >
                      <span>Elements</span>
                      <ChevronDownIcon
                        className={classNames(
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
                      <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg">
                        <div className="absolute inset-0 flex">
                          <div className="bg-gray-50 w-full" />
                          <div className="bg-gray-50 w-full" />
                        </div>
                        <div className="relative max-w-7xl mx-auto grid grid-cols-1">
                          <nav className="grid gap-y-10 px-4 justify-items-center bg-white md:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:py-4 sm:px-6 lg:px-8 xl:pr-12">
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Marketing
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {marketing.slice(0, 10).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Marketing
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {marketing.slice(10).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Application UI
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {applicationUi.slice(0, 10).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Application UI
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {applicationUi.slice(10, 20).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Application UI
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {applicationUi.slice(20, 30).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Application UI
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {applicationUi.slice(30).map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
                                Ecommerce
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {ecommerce.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-3 p-2 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      {/* <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      /> */}
                                      <Image
                                        src={'/img/vaionex-icon.png'}
                                        width={20}
                                        height={20}
                                        alt="element-icons"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </nav>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="flex  items-center md:ml-12">
              {auth.user ? (
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button className="bg-white rounded-full overflow-hidden flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <span className="sr-only">Open user menu</span>
                      {auth.userPhotoURL ? (
                        <Image
                          src={auth.userPhotoURL}
                          height={32}
                          width={32}
                          alt="profile-photo"
                        />
                      ) : (
                        <svg
                          className="h-8 w-8 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-50 right-0 mt-5 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => {
                            if (item.name === 'Sign out') {
                              return (
                                <a
                                  href={item.href}
                                  onClick={() => signOut()}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  {item.name}
                                </a>
                              )
                            } else {
                              return (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  {item.name}
                                </a>
                              )
                            }
                          }}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                // (
                //   <Menu
                //     as="div"
                //     className=" h-10 w-10 rounded-full overflow-hidden bg-gray-100"
                //   >
                //     <Menu.Button className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                //       <span className="flex relative w-full h-full rounded-full overflow-hidden bg-gray-100">
                //         {auth.userPhotoURL ? (
                //           <Image
                //             src={auth.userPhotoURL}
                //             objectFit="cover"
                //             layout="fill"
                //             alt="profile-photo"
                //           />
                //         ) : (
                //           <svg
                //             className="h-full w-full text-gray-300"
                //             fill="currentColor"
                //             viewBox="0 0 24 24"
                //           >
                //             <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                //           </svg>
                //         )}
                //       </span>
                //     </Menu.Button>
                //     <Transition
                //       as={Fragment}
                //       enter="transition ease-out duration-100"
                //       enterFrom="transform opacity-0 scale-95"
                //       enterTo="transform opacity-100 scale-100"
                //       leave="transition ease-in duration-75"
                //       leaveFrom="transform opacity-100 scale-100"
                //       leaveTo="transform opacity-0 scale-95"
                //     >
                //       <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                //         <div className="py-1">
                //           <Menu.Item>
                //             {({ active }) => (
                //               <a
                //                 href="/user-profile"
                //                 className={classNames(
                //                   active
                //                     ? 'bg-gray-100 text-gray-900'
                //                     : 'text-gray-700',
                //                   'block px-4 py-2 text-sm',
                //                 )}
                //               >
                //                 Account settings
                //               </a>
                //             )}
                //           </Menu.Item>
                //           <Menu.Item>
                //             {({ active }) => (
                //               <a
                //                 href="#"
                //                 className={classNames(
                //                   active
                //                     ? 'bg-gray-100 text-gray-900'
                //                     : 'text-gray-700',
                //                   'block px-4 py-2 text-sm',
                //                 )}
                //               >
                //                 Support
                //               </a>
                //             )}
                //           </Menu.Item>
                //           <Menu.Item>
                //             {({ active }) => (
                //               <a
                //                 href="#"
                //                 className={classNames(
                //                   active
                //                     ? 'bg-gray-100 text-gray-900'
                //                     : 'text-gray-700',
                //                   'block px-4 py-2 text-sm',
                //                 )}
                //               >
                //                 License
                //               </a>
                //             )}
                //           </Menu.Item>
                //           <Menu.Item>
                //             {({ active }) => (
                //               <button
                //                 onClick={() => signOut()}
                //                 type="submit"
                //                 className={classNames(
                //                   active
                //                     ? 'bg-gray-100 text-gray-900'
                //                     : 'text-gray-700',
                //                   'block w-full text-left px-4 py-2 text-sm',
                //                 )}
                //               >
                //                 Sign out
                //               </button>
                //             )}
                //           </Menu.Item>
                //         </div>
                //       </Menu.Items>
                //     </Transition>
                //   </Menu>
                // )
                <>
                  <NextLink href="/login">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      Sign in
                    </a>
                  </NextLink>
                  <NextLink href="/register">
                    <a className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      Sign up
                    </a>
                  </NextLink>
                </>
              )}
            </div>
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
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-8 text-base">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {' '}
                      View all products <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-1 gap-4">
                <NextLink href="/components">
                  <a className="rounded-md text-base font-medium py-2 bg-gray-200 hover:bg-gray-300 flex justify-center text-gray-900 hover:text-gray-700">
                    Components
                  </a>
                </NextLink>
              </div>
              <div className="mt-6">
                <NextLink href="/register">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </a>
                </NextLink>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <NextLink href="/login">
                    <a className="text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </a>
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
