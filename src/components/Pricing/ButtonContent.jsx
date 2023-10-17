import React from 'react'
import SpinnerComponent from '../Common/Spinner'
export function ButtonContent({ loadingStripeCheckout, currentPlan, id }) {
  if (loadingStripeCheckout === id) {
    return <SpinnerComponent />
  }
  if (currentPlan === id) {
    return 'Current'
  }
  return 'Get started'
}
