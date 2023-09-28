import PricingComponent from '@/components/Pricing'
import { getPricingPlans } from '@/utils/stripe'

export default async function Products() {
  const plans = await getPricingPlans()
  return <PricingComponent plans={plans} />
}
