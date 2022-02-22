/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const plans = [
  {
    id: 'small',
    name: 'Small',
    description: '4 GB RAM / 2 CPUS / 80 GB SSD Storage',
  },
  {
    id: 'medium',
    name: 'Medium',
    description: '8 GB RAM / 4 CPUS / 160 GB SSD Storage',
  },
  {
    id: 'large',
    name: 'Large',
    description: '16 GB RAM / 8 CPUS / 320 GB SSD Storage',
  },
]

export default function Example() {
  return (
    <fieldset>
      <legend className="sr-only">Plan</legend>
      <div className="space-y-5">
        {plans.map((plan) => (
          <div key={plan.id} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={plan.id}
                aria-describedby={`${plan.id}-description`}
                name="plan"
                type="radio"
                defaultChecked={plan.id === 'small'}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={plan.id} className="font-medium text-gray-700">
                {plan.name}
              </label>
              <p id={`${plan.id}-description`} className="text-gray-500">
                {plan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
