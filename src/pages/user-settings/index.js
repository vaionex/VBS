import Settings from '@/components/ui/forms/settings-form'
import SharedLayout from '@/components/layout/shared-layout'
import WithAuthProtection from 'src/hooks/authProtection'

const SettingsProfile = () => {
  return (
    <SharedLayout title="Settings">
      <Settings />
    </SharedLayout>
  )
}

export default WithAuthProtection(SettingsProfile)
