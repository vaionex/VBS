import ProductsComponent from '@/components/Products'
import { getPricingPlans } from '@/utils/stripe'

export default async function Products() {
  const plans = await getPricingPlans()
  return <ProductsComponent plans={plans} />
}
