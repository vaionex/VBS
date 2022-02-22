import React from 'react'

import {
  BriefcaseIcon,
  InformationCircleIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline'

import Header from '../../components/layout/header/index'

const marketing = [
  {
    name: 'Hero Sections',
    href: '/company/heros',
    icon: BriefcaseIcon,
  },
  {
    name: 'Feature Sections',
    href: '/company/forms',
    icon: BriefcaseIcon,
  },
  { name: 'CTA Sections', href: '/company/footers', icon: BriefcaseIcon },
  {
    name: 'Pricing Sections',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  {
    name: 'Header Sections',
    href: '/company/testimonials',
    icon: BriefcaseIcon,
  },
  { name: 'FAQs', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Newsletter Sections',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Stats', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Testimonials', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Blog Sections', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Contact Sections',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Team Sections', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Content Sections',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Footers', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Headers', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Banners', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Flyout Menus', href: '/company/incentives', icon: BriefcaseIcon },
  { name: '404 Pages', href: '/company/incentives', icon: BriefcaseIcon },
]
const applicationUi = [
  { name: 'Page Headings', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Card Headings', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Section Headings',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  {
    name: 'Description Lists',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Stats', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Calendars', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Tables', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Stacked Lists', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Grid Lists', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Feeds', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Form Layouts', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Input Groups', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Select Menus', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Sign-in and Registration',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Textareas', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Radio Groups', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Checkboxes', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Toggles', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Action Panels', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Comboboxes', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Alerts', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Empty States', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Navbars', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Pagination', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Tabs', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Vertical Navigation',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  {
    name: 'Sidebar Navigation',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Breadcrumbs', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Steps', href: '/company/incentives', icon: BriefcaseIcon },
  {
    name: 'Command Palettes',
    href: '/company/incentives',
    icon: BriefcaseIcon,
  },
  { name: 'Modals', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Slide-overs', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Notifications', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Avatars', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Dropdowns', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Badges', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Buttons', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Button Groups', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Containers', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Panels', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'List containers', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Media Objects', href: '/company/incentives', icon: BriefcaseIcon },
  { name: 'Dividers', href: '/company/incentives', icon: BriefcaseIcon },
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

export default function Footers() {
  return (
    <>
      <Header />
      <div>
        <h3 className="text-base font-medium tracking-wide pt-3 text-center text-gray-500 uppercase">
          Marketing
        </h3>
        <ul role="list" className="mt-5 space-y-1">
          {marketing.map((item) => (
            <li key={item.name} className="flow-root">
              <a
                href={item.href}
                className=" p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
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
        <ul role="list" className="mt-5 space-y-3">
          {applicationUi.map((item) => (
            <li key={item.name} className="flow-root">
              <a
                href={item.href}
                className=" p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
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
        <ul role="list" className="mt-5 space-y-3">
          {ecommerce.map((item) => (
            <li key={item.name} className="flow-root">
              <a
                href={item.href}
                className=" p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
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
    </>
  )
}
