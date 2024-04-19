import { APIThreads } from '@/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createThread = createAsyncThunk('threads/createThread', APIThreads.createThread);

const initialState = {
  status: 'idle',
  message: '',
  data: {},
};

const createThreadSlice = createSlice({
  name: 'threads/createThread',
  initialState,
  reducers: {
    resetCreateThread: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: {},
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createThread.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(createThread.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        message: payload.message,
        data: payload.data.thread,
      }))
      .addCase(createThread.rejected, (state, { error }) => {
        if (error.message) {
          return { ...state, status: 'error', message: error.message };
        }
        return { ...state, status: 'error', message: error.error.message };
      });
  },
});

export const { resetCreateThread } = createThreadSlice.actions;
export const createThreadReducer = createThreadSlice.reducer;
export const createThreadSelector = (state) => state.createThread;
