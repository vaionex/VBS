import React from 'react'

import {
  marketing,
  applicationUi,
  ecommerce,
} from 'src/constants/navbarElements'

import Header from '../../components/layout/header/index'

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
