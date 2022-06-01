import Settings from '@/presets/forms/settings-form'
import Layout from '@/presets/layout'
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
