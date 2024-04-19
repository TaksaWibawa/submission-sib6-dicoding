import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';

const initialState = {
  status: 'idle',
  message: '',
  data: [],
  filteredData: [],
};
export const getThreads = createAsyncThunk('threads/getThreads', APIThreads.getThreads);

const getThreadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    filterThreads: (state, { payload }) => {
      const tag = payload;

      if (tag === '') {
        return { ...state, filteredData: state.data };
      }

      const filteredThreads = state.data.filter((thread) =>
        thread.category.toLowerCase().includes(tag.toLowerCase())
      );

      return { ...state, filteredData: filteredThreads };
    },

    resetThreads: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: [],
      filteredData: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThreads.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getThreads.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        data: payload.data?.threads,
        filteredData: payload.data?.threads,
        message: payload.message,
      }))
      .addCase(getThreads.rejected, (state, { error }) => {
        if (error.message) {
          return { ...state, status: 'error', message: error.message };
        }
        return { ...state, status: 'error', message: error.error.message };
      });
  },
});

export const { filterThreads, resetThreads } = getThreadsSlice.actions;
export const threadsReducer = getThreadsSlice.reducer;
export const threadsSelector = (state) => state.threads;
