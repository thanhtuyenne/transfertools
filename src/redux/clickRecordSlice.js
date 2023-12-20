import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  data:[]
}

export const clickRecordSlice = createSlice({
  name: 'clickRecord',
  initialState,
  reducers: {
    onClickRecord: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
      state.data.push(action.payload)
    },
    dontClickRecord: (state) =>{
      state.value= false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickRecord,dontClickRecord } = clickRecordSlice.actions

export default clickRecordSlice.reducer