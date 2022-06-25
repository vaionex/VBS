import Settings from '@/components/ui/forms/settings-form'
import useAuthProtection from '@/hooks/useAuthProtection'

const SettingsProfile = () => {
  const authUser = useAuthProtection()

  if (!authUser) {
    return <div>Loading...</div>
  }
  return (
    <SharedLayout title="Settings">
      <Settings />
    </SharedLayout>
  )
}

export default SettingsProfile
