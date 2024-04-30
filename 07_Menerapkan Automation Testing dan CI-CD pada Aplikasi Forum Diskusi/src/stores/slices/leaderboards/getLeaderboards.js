import { APILeaderboards } from '@/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getLeaderboards = createAsyncThunk(
  'leaderboards/getLeaderboards',
  APILeaderboards.getLeaderboards
);

const initialState = {
  status: 'idle',
  message: '',
  data: [],
};

const getLeaderboardsSlice = createSlice({
  name: 'leaderboards/getLeaderboards',
  initialState,
  reducers: {
    resetLeaderboards: (state) => ({ ...state, status: 'idle', message: '', data: [] }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboards.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getLeaderboards.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        message: payload.message,
        data: payload.data.leaderboards,
      }))
      .addCase(getLeaderboards.rejected, (state, { error }) => ({
        ...state,
        status: 'error',
        message: error.message,
      }));
  },
});

export const { resetLeaderboards } = getLeaderboardsSlice.actions;
export const getLeaderboardsReducer = getLeaderboardsSlice.reducer;
export const getLeaderboardsSelector = (state) => state.leaderboards;
