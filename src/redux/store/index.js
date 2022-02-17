import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/auth'

const reducer = {
  // Add your reducers here
  auth: authSlice.reducer,
}

const store = configureStore({
  reducer,
})

export default store
