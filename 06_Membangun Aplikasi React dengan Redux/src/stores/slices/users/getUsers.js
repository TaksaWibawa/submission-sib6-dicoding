import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIUsers } from '@/apis';

export const getUsers = createAsyncThunk('users/getUsers', APIUsers.getUsers);

const initialState = {
  status: 'idle',
  message: '',
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => ({
      ...state,
      status: 'idle',
      message: '',
      data: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getUsers.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'success',
        data: payload.data?.users,
        message: payload.message,
      }))
      .addCase(getUsers.rejected, (state, { error }) => {
        if (error.message) {
          return { ...state, status: 'error', message: error.message };
        }
        return { ...state, status: 'error', message: error.error.message };
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const usersSelector = (state) => state.users;
