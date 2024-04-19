import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIAuth, APIUsers } from '@/apis';

export const login = createAsyncThunk('auth/login', APIAuth.login);
export const register = createAsyncThunk('auth/register', APIAuth.register);
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', APIUsers.getCurrentUser);

const initialState = {
  currentUser: null,
  token: null,
  status: 'idle',
  message: '',
};

const actionPending = (state) => ({
  ...state,
  status: 'loading',
});

const actionFulfilled = (state, action) => {
  const newState = {
    ...state,
    status: 'success',
    message: action.payload.message,
  };

  if (action.type === 'auth/register/fulfilled') {
    return newState;
  }

  if (action.payload.data.token) {
    newState.token = action.payload.data.token;
  }

  if (action.payload.data.user) {
    newState.currentUser = action.payload.data.user;
  }

  return newState;
};

const actionRejected = (state, { error }) => {
  if (error.message) {
    return { ...state, status: 'error', message: error.message };
  }
  return { ...state, status: 'error', message: error.error.message };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('persist:root');
      return {
        ...state,
        currentUser: null,
        token: null,
        status: 'idle',
        message: '',
      };
    },
    resetStatusAuth: (state) => ({
      ...state,
      status: 'idle',
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, actionPending)
      .addCase(login.fulfilled, actionFulfilled)
      .addCase(login.rejected, actionRejected)

      .addCase(register.pending, actionPending)
      .addCase(register.fulfilled, actionFulfilled)
      .addCase(register.rejected, actionRejected)

      .addCase(getCurrentUser.pending, actionPending)
      .addCase(getCurrentUser.fulfilled, actionFulfilled)
      .addCase(getCurrentUser.rejected, actionRejected);
  },
});

export const { resetStatusAuth, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.auth;
