import PropTypes from 'prop-types'

const FormInput = ({ label, ...props }) => {
  const { id } = props
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          // id="password"
          // name="password"
          // type="password"
          // autoComplete="current-password"
          // required
          {...props}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
}

export default FormInput
