import React from 'react'

import Header from '../../components/layout/header/index'
import Testimonial1 from '../../components/layout/elements/testimonial/testimonial1'
import Testimonial2 from '../../components/layout/elements/testimonial/testimonial2'
import Testimonial3 from '../../components/layout/elements/testimonial/testimonial3'
import Testimonial4 from '../../components/layout/elements/testimonial/testimonial4'
import Testimonial5 from '../../components/layout/elements/testimonial/testimonial5'

export default function Incentives() {
  return (
    <>
      <Header />
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Testimonial - 1
        </h1>
        <Testimonial1 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Testimonial - 2
        </h1>
        <Testimonial2 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Testimonial - 3
        </h1>
        <Testimonial3 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Testimonial - 4
        </h1>
        <Testimonial4 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Testimonial - 5
        </h1>
        <Testimonial5 />
      </div>
    </>
  )
}
