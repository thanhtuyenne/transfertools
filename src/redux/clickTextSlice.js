// clickTextSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  currentInputValue: '', // Dữ liệu tạm thời từ ô input 1
  data: [],
};

export const clickTextSlice = createSlice({
  name: 'clickText',
  initialState,
  reducers: {
    setInputValueText: (state, action) => {
      state.currentInputValue = action.payload;
      state.value = true;
    },
    onClickInputText: (state) => {
      // state.value = true;
      // Lưu dữ liệu từ ô input 1 vào mảng data khi rời khỏi hoặc hoàn thành việc nhập liệu
      if (state.currentInputValue.trim() !== '') {
        state.data = [...state.data, state.currentInputValue];
        state.currentInputValue = ''; // Reset dữ liệu tạm thời của ô input 1
      }
    },
    dontClickInputText: (state) => {
      state.value = false;
    },
    deleteDataByIdText: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item,index) => index +1 !== idToDelete);

    }
  },
});

export const { setInputValueText, onClickInputText, dontClickInputText,deleteDataByIdText } = clickTextSlice.actions;

export default clickTextSlice.reducer;
