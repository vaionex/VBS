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
export default function Example() {
  return (
    <div>
      <label
        htmlFor="name"
        className="ml-px pl-4 block text-sm font-medium text-gray-700"
      >
        Name
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="name"
          id="name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
          placeholder="Jane Doe"
        />
      </div>
    </div>
  )
}
