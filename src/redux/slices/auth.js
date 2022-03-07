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
  errorMessage: null,
  isAuthenticated: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseLogin(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
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
    try {
      const user = await firebaseRegister(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
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
    setResetAuth: (state) => {
      ;(state.user = null),
        (state.isPending = false),
        (state.errorMessage = null),
        (state.isAuthenticated = false)
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isPending = true
      state.errorMessage = null
    },
    [login.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.isPending = false
      state.user = action.payload
    },
    [register.pending]: (state, action) => {
      state.isPending = true
      state.errorMessage = null
    },
    [register.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [register.fulfilled]: (state, action) => {
      state.isPending = false
      state.user = action.payload
    },
    [logout.pending]: (state, action) => {
      state.isPending = true
      state.errorMessage = null
    },
    [logout.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [logout.fulfilled]: (state, action) => {
      state.isPending = false
      state.user = null
      state.isPending = false
      state.errorMessage = null
      state.isAuthenticated = false
    },
  },
})

export default authSlice
export const { setUserData, setAuthenticated, setResetAuth } = authSlice.actions
