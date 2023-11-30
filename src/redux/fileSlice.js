import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    onClickFile: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    dontClickFile: (state) =>{
      state.value= false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickFile,dontClickFile } = fileSlice.actions

export default fileSlice.reducer