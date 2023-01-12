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
  accessToken: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        state.errorMessage = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false
        state.user = action.payload
      })
      .addCase(register.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isPending = false
        state.errorMessage = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isPending = false
        state.user = action.payload
      })
      .addCase(logout.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isPending = false
        state.errorMessage = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPending = false
        state.user = null
        state.isPending = false
        state.errorMessage = null
        state.isAuthenticated = false
      })
  },
})

export default authSlice
export const { setUserData, setAuthenticated, setResetAuth } = authSlice.actions
