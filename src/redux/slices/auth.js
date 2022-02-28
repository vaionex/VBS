/* eslint-disable no-unused-vars */
import {
  firebaseLogin,
  firebaseLogout,
  firebaseRegister,
} from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  userPhotoURL: null,
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
    setUserProfilePic: (state, action) => {
      state.userPhotoURL = action.payload
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true
    },
    setResetAuth: (state) => {
      ;(state.user = null),
        (state.userPhotoURL = null),
        (state.isPending = false),
        (state.isError = false),
        (state.isAuthenticated = false)
    },
  },
})

export default authSlice
export const {
  setUserData,
  setUserProfilePic,
  setAuthenticated,
  setResetAuth,
} = authSlice.actions
