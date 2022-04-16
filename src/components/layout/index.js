import React from 'react'
import Header from './header'
import Footer from './footer'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col flex-1">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
