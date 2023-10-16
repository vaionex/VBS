import React from 'react'
export function ButtonContent({ loadingStripeCheckout, currentPlan, id }) {
  if (loadingStripeCheckout === id) {
    return (
      <div
        className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent rounded-full text-blue-600 "
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if (currentPlan === id) {
    return 'Current'
  }
  return 'Get started'
}
