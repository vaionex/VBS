import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center'
import { useFirebaseAuth } from '@/firebase'

const NovuNotificationCenter = () => {
  const { authUser } = useFirebaseAuth()

  const theme = {
    light: {
      loaderColor: '#2563EB',
    }
  }

  return (
    <NovuProvider
      subscriberId={authUser.uid}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID}
    >
      <PopoverNotificationCenter colorScheme={'light'} theme={theme}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
export default NovuNotificationCenter
