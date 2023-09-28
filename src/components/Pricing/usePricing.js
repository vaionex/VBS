import { useMemo } from 'react'

const CENTS_IN_DOLLAR = 100

// helper function to find the price for a given interval
const findPriceForInterval = (prices, interval) =>
  prices.find((x) => x.interval === interval) || prices[0]

// helper function to calculate the price to show
const calculatePriceToShow = (currentPrice) => {
  if (currentPrice?.billing_scheme !== 'tiered') {
    const unitAmount = currentPrice?.unit_amount || 0
    return unitAmount / CENTS_IN_DOLLAR
  }

  const flatPrice = currentPrice.tiers.find((tier) => tier?.flat_amount)
  return flatPrice ? flatPrice.flat_amount / CENTS_IN_DOLLAR : 0
}

// helper function to calculate the monthly price
const calculateMonthlyPrice = (title, billingCycle, upsell_discount) =>
  billingCycle === 'year' && title !== 'Basic Plan' ? upsell_discount : null

// To calculate the saved amount in percentage
const getPercentageValue = (yearlyAmount, discountedPrice) => {
  const discountedPercentage = (discountedPrice * 100) / yearlyAmount
  return Math.trunc(discountedPercentage)
}

//To calculate Pricing
function usePricing(plan, billingCycle) {
  return useMemo(() => {
    const {
      stripe_metadata_title: title,
      stripe_metadata_upsell_discount: upsell_discount,
      prices,
    } = plan

    const currentPrice = findPriceForInterval(prices, billingCycle)
    let priceToShow = calculatePriceToShow(currentPrice)

    let calculatedSavedAmountInPercentage
    let actualYearlyAmount

    if (billingCycle === 'year' && currentPrice?.interval === 'year') {
      const monthlyCyclePrice = calculateMonthlyPrice(
        title,
        billingCycle,
        upsell_discount,
      )
      actualYearlyAmount = Number(monthlyCyclePrice) + priceToShow
      calculatedSavedAmountInPercentage = getPercentageValue(
        actualYearlyAmount,
        Number(monthlyCyclePrice),
      )
    }
    let monthlyPrice

    if (billingCycle === 'year' && currentPrice?.interval === 'year') {
      monthlyPrice = priceToShow / 10
      priceToShow = Math.ceil(priceToShow / 12)
    }

    return [
      currentPrice,
      monthlyPrice,
      priceToShow,
      calculatedSavedAmountInPercentage,
    ]
  }, [plan, billingCycle])
}

export default usePricing
