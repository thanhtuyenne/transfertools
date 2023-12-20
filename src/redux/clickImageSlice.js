import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  data:[]
}

export const clickImageSlice = createSlice({
  name: 'clickImage',
  initialState,
  reducers: {
    onClickImage: (state, action) => {
      state.value = true;
      state.data.push(action.payload)
      // state.data = action.payload;
      
      // console.log("check redux:",action.payload)

    },
    dontClickImage: (state) => {
      state.value = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickImage, dontClickImage } = clickImageSlice.actions

export default clickImageSlice.reducer