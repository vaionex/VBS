import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  walletData: null,
  balance: 0,
  address: '',
  addressPath0: '',
  mnemonic: '',
  wallethistory: [],
  walletid: '00000000-0000-0000-0000-000000000000',
  paymail: '',
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletData: (state, action) => {
      state.walletData = action.payload
    },
    updateWalletHistory: (state, action) => {
      state.wallethistory = action.payload
    },
    clearWalletData: (state, action) => {
      state.walletData = null
      state.balance = 0
      state.address = ''
      state.addressPath0 = ''
      state.mnemonic = ''
      state.wallethistory = []
      state.walletid = '00000000-0000-0000-0000-000000000000'
      state.paymail = ''
    },
    updateMnemonic: (state, action) => {
      state.mnemonic = action.payload
    },
    updateBalance: (state, action) => {
      state.balance = action.payload
    },
    updateAddress: (state, action) => {
      state.address = action.payload
    },
    updateAddressPath0: (state, action) => {
      state.addressPath0 = action.payload
    },
    updatePaymail: (state, action) => {
      state.paymail = action.payload
    },
  },
})

export default walletSlice
export const {
  updateWalletData,
  updateWalletHistory,
  clearWalletData,
  updateMnemonic,
  updateBalance,
  updateAddress,
  updateAddressPath0,
  updatePaymail,
} = walletSlice.actions
