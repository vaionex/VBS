import React from 'react'

import Header from '../../components/layout/header/index'
import Footer1 from '../../components/layout/elements/footer/footer1'
import Footer2 from '../../components/layout/elements/footer/footer2'
import Footer3 from '../../components/layout/elements/footer/footer3'

export default function Footers() {
  return (
    <>
      <Header />
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Footer - 1
        </h1>
        <Footer1 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Footer - 2
        </h1>
        <Footer2 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Footer - 3
        </h1>
        <Footer3 />
      </div>
    </>
  )
}
