import { APIThreads } from '@/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createComment = createAsyncThunk('threads/createComment', APIThreads.createComment);

const initialState = {
  status: 'idle',
  message: '',
  data: [],
};

const createCommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetCreateComment: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(createComment.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        message: payload.message,
        data: payload.data?.comment,
      }))
      .addCase(createComment.rejected, (state, { error }) => {
        if (error.message) {
          return { ...state, status: 'error', message: error.message };
        }
        return { ...state, status: 'error', message: error.error.message };
      });
  },
});

export const { resetCreateComment } = createCommentSlice.actions;
export const createCommentReducer = createCommentSlice.reducer;
export const createCommentSelector = (state) => state.createComment;
