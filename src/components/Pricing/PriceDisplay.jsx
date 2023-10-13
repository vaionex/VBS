import React from 'react'
import NumberCount from '../Common/NumberCount'

export function PriceDisplay({ priceToShow, id }) {
  if (priceToShow === 0) {
    return 'Free'
  }
  return (
    <>
      $
      <NumberCount key={id + '_numCount'} targetNumber={priceToShow} />
    </>
  )
}
