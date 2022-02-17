/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
  },
})

export default authSlice
export const { login, logout } = authSlice.actions
