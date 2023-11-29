import { configureStore } from '@reduxjs/toolkit'
import clickSlice from './clickSlice'
import fileSlice from './fileSlice'

export const store = configureStore({
  reducer: {
    click: clickSlice,
    file:fileSlice,
  }
})