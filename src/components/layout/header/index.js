/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import NextLink from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

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
const marketing = [
  {
    name: 'Hero Sections',
    href: '/company/marketing/hero',
    icon: BriefcaseIcon,
  },
  {
    name: 'Feature Sections',
    href: '/company/marketing/feature',
    icon: BriefcaseIcon,
  },
  {
    name: 'CTA Sections',
    href: '/company/marketing/cta',
    icon: BriefcaseIcon,
  },
  {
    name: 'Pricing Sections',
    href: '/company/marketing/pricing',
    icon: BriefcaseIcon,
  },
  {
    name: 'Header Sections',
    href: '/company/marketing/header',
    icon: BriefcaseIcon,
  },
  { name: 'FAQs', href: '/company/marketing/faqs', icon: BriefcaseIcon },
  {
    name: 'Newsletter Sections',
    href: '/company/marketing/newsletter',
    icon: BriefcaseIcon,
  },
  { name: 'Stats', href: '/company/marketing/stats', icon: BriefcaseIcon },
  {
    name: 'Testimonials',
    href: '/company/marketing/testimonials',
    icon: BriefcaseIcon,
  },
  {
    name: 'Blog Sections',
    href: '/company/marketing/blog',
    icon: BriefcaseIcon,
  },
  {
    name: 'Contact Sections',
    href: '/company/marketing/contact',
    icon: BriefcaseIcon,
  },
  {
    name: 'Team Sections',
    href: '/company/marketing/team',
    icon: BriefcaseIcon,
  },
  {
    name: 'Content Sections',
    href: '/company/marketing/content',
    icon: BriefcaseIcon,
  },
  {
    name: 'Logo Clouds',
    href: '/company/marketing/logoclouds',
    icon: BriefcaseIcon,
  },
  { name: 'Footers', href: '/company/marketing/footer', icon: BriefcaseIcon },
  { name: 'Headers', href: '/company/marketing/headers', icon: BriefcaseIcon },
  { name: 'Banners', href: '/company/marketing/banners', icon: BriefcaseIcon },
  {
    name: 'Flyout Menus',
    href: '/company/marketing/flyoutmenus',
    icon: BriefcaseIcon,
  },
  {
    name: '404 Pages',
    href: '/company/marketing/pages404',
    icon: BriefcaseIcon,
  },
]
const applicationUi = [
  {
    name: 'Page Headings',
    href: '/company/application-ui/pageheadings',
    icon: BriefcaseIcon,
  },
  {
    name: 'Card Headings',
    href: '/company/application-ui/cardheadings',
    icon: BriefcaseIcon,
  },
  {
    name: 'Section Headings',
    href: '/company/application-ui/sectionheadings',
    icon: BriefcaseIcon,
  },
  {
    name: 'Description Lists',
    href: '/company/application-ui/descriptionlists',
    icon: BriefcaseIcon,
  },
  {
    name: 'Stats',
    href: '/company/application-ui/stats',
    icon: BriefcaseIcon,
  },
  {
    name: 'Calendars',
    href: '/company/application-ui/calendars',
    icon: BriefcaseIcon,
  },
  {
    name: 'Tables',
    href: '/company/application-ui/tables',
    icon: BriefcaseIcon,
  },
  {
    name: 'Stacked Lists',
    href: '/company/application-ui/stackedlists',
    icon: BriefcaseIcon,
  },
  {
    name: 'Grid Lists',
    href: '/company/application-ui/gridlists',
    icon: BriefcaseIcon,
  },
  {
    name: 'Feeds',
    href: '/company/application-ui/feeds',
    icon: BriefcaseIcon,
  },
  {
    name: 'Form Layouts',
    href: '/company/application-ui/formlayouts',
    icon: BriefcaseIcon,
  },
  {
    name: 'Input Groups',
    href: '/company/application-ui/inputgroups',
    icon: BriefcaseIcon,
  },
  {
    name: 'Select Menus',
    href: '/company/application-ui/selectmenus',
    icon: BriefcaseIcon,
  },
  {
    name: 'Sign-in and Registration',
    href: '/company/application-ui/signinregistrations',
    icon: BriefcaseIcon,
  },
  {
    name: 'Textareas',
    href: '/company/application-ui/textareas',
    icon: BriefcaseIcon,
  },
  {
    name: 'Radio Groups',
    href: '/company/application-ui/radiogroups',
    icon: BriefcaseIcon,
  },
  {
    name: 'Checkboxes',
    href: '/company/application-ui/checkboxes',
    icon: BriefcaseIcon,
  },
  {
    name: 'Toggles',
    href: '/company/application-ui/toggles',
    icon: BriefcaseIcon,
  },
  {
    name: 'Action Panels',
    href: '/company/application-ui/actionpanels',
    icon: BriefcaseIcon,
  },
  {
    name: 'Comboboxes',
    href: '/company/application-ui/comboboxes',
    icon: BriefcaseIcon,
  },
  {
    name: 'Alerts',
    href: '/company/application-ui/alerts',
    icon: BriefcaseIcon,
  },
  {
    name: 'Empty States',
    href: '/company/application-ui/emptystates',
    icon: BriefcaseIcon,
  },
  {
    name: 'Navbars',
    href: '/company/application-ui/navbars',
    icon: BriefcaseIcon,
  },
  {
    name: 'Pagination',
    href: '/company/application-ui/pagination',
    icon: BriefcaseIcon,
  },
  {
    name: 'Tabs',
    href: '/company/application-ui/tabs',
    icon: BriefcaseIcon,
  },
  {
    name: 'Vertical Navigation',
    href: '/company/application-ui/verticalnavigation',
    icon: BriefcaseIcon,
  },
  {
    name: 'Sidebar Navigation',
    href: '/company/application-ui/sidebarnavigation',
    icon: BriefcaseIcon,
  },
  {
    name: 'Breadcrumbs',
    href: '/company/application-ui/breadcrumbs',
    icon: BriefcaseIcon,
  },
  {
    name: 'Steps',
    href: '/company/application-ui/steps',
    icon: BriefcaseIcon,
  },
  {
    name: 'Command Palettes',
    href: '/company/application-ui/commandpalet',
    icon: BriefcaseIcon,
  },
  {
    name: 'Modals',
    href: '/company/application-ui/modals',
    icon: BriefcaseIcon,
  },
  {
    name: 'Slide-overs',
    href: '/company/application-ui/slideovers',
    icon: BriefcaseIcon,
  },
  {
    name: 'Notifications',
    href: '/company/application-ui/notifications',
    icon: BriefcaseIcon,
  },
  {
    name: 'Avatars',
    href: '/company/application-ui/avatars',
    icon: BriefcaseIcon,
  },
  {
    name: 'Dropdowns',
    href: '/company/application-ui/dropdowns',
    icon: BriefcaseIcon,
  },
  {
    name: 'Badges',
    href: '/company/application-ui/badges',
    icon: BriefcaseIcon,
  },
  {
    name: 'Buttons',
    href: '/company/application-ui/buttons',
    icon: BriefcaseIcon,
  },
  {
    name: 'Button Groups',
    href: '/company/application-ui/buttongroups',
    icon: BriefcaseIcon,
  },
  {
    name: 'Containers',
    href: '/company/application-ui/containers',
    icon: BriefcaseIcon,
  },
  {
    name: 'Panels',
    href: '/company/application-ui/panels',
    icon: BriefcaseIcon,
  },
  {
    name: 'List containers',
    href: '/company/application-ui/listcontainers',
    icon: BriefcaseIcon,
  },
  {
    name: 'Media Objects',
    href: '/company/application-ui/mediaobjects',
    icon: BriefcaseIcon,
  },
  {
    name: 'Dividers',
    href: '/company/application-ui/dividers',
    icon: BriefcaseIcon,
  },
]
const ecommerce = [
  { name: 'Product Overviews', href: '#', icon: BriefcaseIcon },
  { name: 'Product Lists', href: '#', icon: BriefcaseIcon },
  { name: 'Category Previews', href: '#', icon: BriefcaseIcon },
  { name: 'Shopping Carts', href: '#', icon: BriefcaseIcon },
  { name: 'Category Filters', href: '#', icon: BriefcaseIcon },
  { name: 'Product Quickviews', href: '#', icon: BriefcaseIcon },
  { name: 'Product Features', href: '#', icon: BriefcaseIcon },
  { name: 'Store Navigation', href: '#', icon: BriefcaseIcon },
  { name: 'Promo Sections', href: '#', icon: BriefcaseIcon },
  { name: 'Checkout Forms', href: '#', icon: BriefcaseIcon },
  { name: 'Reviews', href: '#', icon: BriefcaseIcon },
  { name: 'Order Summaries', href: '#', icon: BriefcaseIcon },
  { name: 'Order History', href: '#', icon: BriefcaseIcon },
  { name: 'Incentives', href: '#', icon: BriefcaseIcon },
]
const resources = [
  { name: 'Community', href: '#', icon: UserGroupIcon },
  { name: 'Partners', href: '#', icon: GlobeAltIcon },
  { name: 'Guides', href: '#', icon: BookmarkAltIcon },
  { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
]
const blogPosts = [
  {
    id: 1,
    name: 'Boost your conversion rate',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
  },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Popover className="relative bg-white">
      <div
        className="absolute inset-0 shadow z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <a href="#" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
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
                          <nav className="grid gap-y-10 px-4 justify-items-center bg-white md:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:py-2 sm:px-6 lg:px-8 xl:pr-12">
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
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
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </nav>
                          <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                            <div>
                              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                From the blog
                              </h3>
                              <ul role="list" className="mt-6 space-y-6">
                                {blogPosts.map((post) => (
                                  <li key={post.id} className="flow-root">
                                    <a
                                      href={post.href}
                                      className="-m-3 p-2 flex rounded-lg hover:bg-gray-100"
                                    >
                                      <div className="hidden sm:block flex-shrink-0">
                                        <img
                                          className="w-32 h-20 object-cover rounded-md"
                                          src={post.imageUrl}
                                          alt=""
                                        />
                                      </div>
                                      <div className="w-0 flex-1 sm:ml-8">
                                        <h4 className="text-base font-medium text-gray-900 truncate">
                                          {post.name}
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {post.preview}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-6 text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-500"
                              >
                                {' '}
                                View all posts{' '}
                                <span aria-hidden="true">&rarr;</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <NextLink href="/register">
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </a>
              </NextLink>
              <NextLink href="/register">
                <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
              </NextLink>
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
                {/* <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a> */}

                <a
                  href="/company"
                  className="rounded-md text-base font-medium py-2 bg-gray-200 hover:bg-gray-300 flex justify-center text-gray-900 hover:text-gray-700"
                >
                  Components
                </a>

                {/* <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Resources
                </a>

                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Blog
                </a>

                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Contact Sales
                </a> */}
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
