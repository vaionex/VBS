import React from 'react'

import Header from '../../components/layout/header/index'
import Incentive1 from '../../components/layout/elements/incentive/incentive1'
import Incentive2 from '../../components/layout/elements/incentive/incentive2'
import Incentive3 from '../../components/layout/elements/incentive/incentive3'
import Incentive4 from '../../components/layout/elements/incentive/incentive4'
import Incentive5 from '../../components/layout/elements/incentive/incentive5'
import Incentive6 from '../../components/layout/elements/incentive/incentive6'
import Incentive7 from '../../components/layout/elements/incentive/incentive7'
import Incentive8 from '../../components/layout/elements/incentive/incentive8'

export default function Incentives() {
  return (
    <>
      <Header />
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 1
        </h1>
        <Incentive1 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 2
        </h1>
        <Incentive2 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 3
        </h1>
        <Incentive3 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 4
        </h1>
        <Incentive4 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 5
        </h1>
        <Incentive5 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 6
        </h1>
        <Incentive6 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 7
        </h1>
        <Incentive7 />
      </div>
      <div>
        <h1 className="p-2 font-bold text-3xl text-center text-gray-500">
          Incentive - 8
        </h1>
        <Incentive8 />
      </div>
    </>
  )
}
