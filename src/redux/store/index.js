import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/auth'
import walletSlice from '../slices/wallet'

const reducer = {
  // Add your reducers here
  auth: authSlice.reducer,
  wallet: walletSlice.reducer,
}

const store = configureStore({
  reducer,
})

export default store
