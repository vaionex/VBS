/* eslint-disable no-unused-vars */
import {
  firebaseLogin,
  firebaseLogout,
  firebaseRegister,
} from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isPending: false,
  isError: false,
  isAuthenticated: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    const { email, password } = request

    try {
      const user = await firebaseLogin(email, password)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await firebaseLogout()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const register = createAsyncThunk(
  'user/signupUser',
  async (request, thunkAPI) => {
    const { email, password, username } = request
    try {
      const user = await firebaseRegister(email, password, username)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true
    },
  },
})

export default authSlice
export const { setUserData, setAuthenticated } = authSlice.actions
