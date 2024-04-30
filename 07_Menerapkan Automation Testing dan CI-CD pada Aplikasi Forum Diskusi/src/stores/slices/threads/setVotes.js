import { APIThreads } from '@/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setVoteThread = createAsyncThunk('threads/setVoteThread', APIThreads.setVoteThread);
export const setVoteComment = createAsyncThunk('threads/setVoteComment', APIThreads.setVoteComment);

const initialState = {
  status: 'idle',
  message: '',
  data: [],
};

const actionPending = (state) => ({
  ...state,
  status: 'loading',
});

const actionFullfilled = (state, action) => ({
  ...state,
  status: 'success',
  message: action.payload.message,
  data: action.payload.data?.vote,
});

const actionRejected = (state, { error }) => ({
  ...state,
  status: 'error',
  message: error.message,
});

const setVoteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    resetVote: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setVoteThread.pending, actionPending)
      .addCase(setVoteThread.fulfilled, actionFullfilled)
      .addCase(setVoteThread.rejected, actionRejected)
      .addCase(setVoteComment.pending, actionPending)
      .addCase(setVoteComment.fulfilled, actionFullfilled)
      .addCase(setVoteComment.rejected, actionRejected);
  },
});

export const { resetVote } = setVoteSlice.actions;
export const setVoteReducer = setVoteSlice.reducer;
export const setVoteSelector = (state) => state.vote;
