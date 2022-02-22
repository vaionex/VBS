import React from 'react'

import Header from '../../components/layout/header/index'
import Form1 from '../../components/layout/elements/form/form1'
import Form2 from '../../components/layout/elements/form/form2'

export default function Forms() {
  return (
    <>
      <Header />
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Form - 1
        </h1>
        <Form1 />
      </div>
      <div className="w-full py-3">
        <div className="bg-gray-200 h-1 w-full"></div>
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Form - 2
        </h1>
        <Form2 />
      </div>
    </>
  )
}
