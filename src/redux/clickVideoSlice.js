import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const clickVideoSlice = createSlice({
  name: 'clickVideo',
  initialState,
  reducers: {
    onClickVideo: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    dontClickVideo: (state) =>{
      state.value= false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickVideo,dontClickVideo } = clickVideoSlice.actions

export default clickVideoSlice.reducer