import Settings from '@/components/forms/settings-form'
import Layout from '@/components/layout'
import React from 'react'
import WithAuthProtection from 'src/hooks/authProtection'

const SettingsProfile = () => {
  return (
    <Layout>
      <Settings />
    </Layout>
  )
}

export default WithAuthProtection(SettingsProfile)
