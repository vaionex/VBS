import React, { useState } from 'react'
import Header from './header'
import MainContent from './main-content'
import Sidebar from './sidebar'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
