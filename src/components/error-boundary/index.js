import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div className="text-[60px] font-bold mt-[20px] text-center ">
            We're Sorry!
          </div>
          <h2 className="text-center m-auto mt-3 text-gray-500 w-full md:w-[40%]">
            We're sorry, but its looks like there is a problem accessing the
            content of this website. Sorry for the incovenience. We suggest you{' '}
            <strong>refresh the page</strong> to resolve the issue.
          </h2>
          <div className="place-self-center text-center mt-[40px]">
            <button
              type="button"
              onClick={() => {
                window && window.location.reload(true)
              }}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Refresh
            </button>
          </div>
        </>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
