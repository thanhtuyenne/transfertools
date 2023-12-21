import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  currentInputValue: '', // Dữ liệu tạm thời từ ô input 1
  data: [],
}

export const clickURLSlice = createSlice({
  name: 'clickUrl',
  initialState,
  reducers: {
    setInputValueUrl: (state, action) => {
      state.currentInputValue = action.payload;
      state.value = true;
    },
    onClickInputUrl: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.currentInputValue.trim() !== '') {
        state.data = [...state.data, state.currentInputValue];
        state.currentInputValue = ''; // Reset dữ liệu tạm thời của ô input 1
      }
    },
    dontClickInputUrl: (state) =>{
      state.value= false;
    },
    deleteDataByIdUrl: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item,index) => index +1 !== idToDelete);

    }
  },
})

// Action creators are generated for each case reducer function
export const { setInputValueUrl,onClickInputUrl,dontClickInputUrl,deleteDataByIdUrl } = clickURLSlice.actions

export default clickURLSlice.reducer