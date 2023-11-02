import {
  useFirebaseAuth,
  signInWithGoogle as signInWithGoogleFirebase,
  logoutUser as logoutUserFirebase,
  registerWithEmailAndPassword as registerWithEmailAndPasswordFirebase,
  signInWithEmail as signInWithEmailFirebase,
  updateEmailAddress as updateEmailAddressFirebase,
  updateUserPassword as updateUserPasswordFirebase,
  resetUserPassword as resetUserPasswordFirebase,
  updateUserProfile as updateUserProfileFirebase,
} from '@/firebase/auth'

import {
  updateUserDocs as updateUserDocsFirebase,
  updateCustomerData as updateCustomerDataFirebase,
  getCurrentUserData as getCurrentUserDataFirebase,
} from '@/firebase/firestore'

import { uploadProfileImage as uploadProfileImageFirebase } from '@/firebase/storage'

import {
  useSupabaseAuth,
  signInWithGoogle as signInWithGoogleSupabase,
  logoutUser as logoutUserSupabase,
  registerWithEmailAndPassword as registerWithEmailAndPasswordSupabase,
  signInWithEmail as signInWithEmailSupabase,
  resetUserPassword as resetUserPasswordSupabase,
} from '@/supabase/supaAuth'

export const useAuth = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_PLATFORM === 'supabase') {
    const { authUser, setAuthUser } = useSupabaseAuth()

    return {
      authUser,
      setAuthUser,
      signInWithGoogle: signInWithGoogleSupabase,
      logoutUser: logoutUserSupabase,
      registerWithEmailAndPassword: registerWithEmailAndPasswordSupabase,
      signInWithEmail: signInWithEmailSupabase,
      resetUserPassword: resetUserPasswordSupabase,
      // Other Functions return
    }
  } else {
    const { authUser, isLoading, setAuthUser, updateUserData } =
      useFirebaseAuth()

    return {
      authUser,
      isLoading,
      setAuthUser,
      updateUserData,
      signInWithGoogle: signInWithGoogleFirebase,
      logoutUser: logoutUserFirebase,
      registerWithEmailAndPassword: registerWithEmailAndPasswordFirebase,
      signInWithEmail: signInWithEmailFirebase,
      updateEmailAddress: updateEmailAddressFirebase,
      updateUserPassword: updateUserPasswordFirebase,
      resetUserPassword: resetUserPasswordFirebase,
      updateUserProfile: updateUserProfileFirebase,
      uploadProfileImage: uploadProfileImageFirebase,
      updateUserDocs: updateUserDocsFirebase,
      updateCustomerData: updateCustomerDataFirebase,
      getCurrentUserData: getCurrentUserDataFirebase,
      // Other Functions return
    }
  }
}
