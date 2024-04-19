import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';

const initialState = {
  status: 'idle',
  message: '',
  data: [],
};
export const getDetailThread = createAsyncThunk(
  'threads/getDetailThread',
  APIThreads.getDetailThread
);

const getDetailThreadSlice = createSlice({
  name: 'detailThread',
  initialState,
  reducers: {
    resetDetailThread: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailThread.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getDetailThread.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        data: payload.data?.detailThread,
        message: payload.message,
      }))
      .addCase(getDetailThread.rejected, (state, { error }) => {
        if (error.message) {
          return { ...state, status: 'error', message: error.message };
        }
        return { ...state, status: 'error', message: error.error.message };
      });
  },
});

export const { resetDetailThread } = getDetailThreadSlice.actions;
export const detailThreadReducer = getDetailThreadSlice.reducer;
export const detailThreadSelector = (state) => state.detailThread;
