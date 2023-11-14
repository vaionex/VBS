import React from 'react'
import PricingComponent from '@/components/Pricing'
import { getProductsWithPlans } from '@/utils/stripe'

export default async function Products() {
  const plans = await getProductsWithPlans()
  return <PricingComponent plans={plans} />
}
