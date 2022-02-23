import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectAuth = (state) => state.auth

const authSelector = createDraftSafeSelector(selectAuth, (auth) => auth)

export default authSelector
