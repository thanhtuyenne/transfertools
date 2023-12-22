import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  data:[]
}

export const clickVideoSlice = createSlice({
  name: 'clickVideo',
  initialState,
  reducers: {
    onClickVideo: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
      state.data.push(action.payload)
    },
    dontClickVideo: (state) =>{
      state.value= false;
    },
    deleteDataByIdVideo: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item,index) => index +1 !== idToDelete);

    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickVideo,dontClickVideo,deleteDataByIdVideo } = clickVideoSlice.actions

export default clickVideoSlice.reducer