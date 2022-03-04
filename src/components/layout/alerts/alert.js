/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

const types = (type) => {
  switch (type) {
    case 'success':
      return (
        <CheckCircleIcon
          className="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
      )
    case 'error':
      return (
        <MinusCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      )
    default:
      break
  }
}

const colorType = {
  success: 'green',
  error: 'red',
}

export default function Alert({ message, type }) {
  return (
    <div className={`rounded-md bg-${colorType[type]}-50 p-4 max-w-md w-full`}>
      <div className="flex justify-center">
        <div className="flex-shrink-0">{types(type)}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium text-${colorType[type]}-800`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}
