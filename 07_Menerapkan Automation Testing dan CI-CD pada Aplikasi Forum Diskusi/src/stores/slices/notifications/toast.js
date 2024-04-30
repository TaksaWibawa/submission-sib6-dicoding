import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
  status: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action) => ({
      ...state,
      title: action.payload.title,
      description: action.payload.description,
      status: action.payload.status,
    }),
    clearToast: (state) => ({
      ...state,
      title: '',
      description: '',
      status: '',
    }),
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
export const toastSelector = (state) => state.toast;
