import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIAuth, APIUsers } from '@/apis';
import { authReducer, authSelector, logout, resetStatusAuth } from './auth';

/* auth Test Scenario
  1. authReducer should return the initial state
  2. login thunk should return access token and return success status
  3. login thunk should return error if email or password is incorrect
  4. register thunk should register new user and return success status
  5. register thunk should return error if email is already registered
  6. getCurrentUser thunk should return current user data and success status
  7. getCurrentUser thunk should return error if token is invalid
  8. logout action updates state correctly
  9. resetStatusAuth action resets status and message correctly
*/

describe('auth', () => {
  let store;
  let mockLoginApi;
  let mockRegisterApi;
  let mockGetCurrentUserApi;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    mockLoginApi = vi.spyOn(APIAuth, 'login');
    mockRegisterApi = vi.spyOn(APIAuth, 'register');
    mockGetCurrentUserApi = vi.spyOn(APIUsers, 'getCurrentUser');
  });

  afterEach(() => {
    store.dispatch(resetStatusAuth());
    store.dispatch(logout());
  });

  it('authReducer should return the initial state', () => {
    // Arrange
    const initialState = {
      currentUser: null,
      token: null,
      status: 'idle',
      message: '',
    };

    // Action
    const state = authReducer(undefined, { type: 'unknown' });

    // Assert
    expect(state).toEqual(initialState);
  });

  it('login thunk should return access token and return success status', async () => {
    // Arrange
    const args = {
      email: 'john@example.com',
      password: 'password',
    };
    const mockResponse = {
      status: 'success',
      message: 'ok',
      data: {
        token: 'token',
      },
    };
    mockLoginApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/login', APIAuth.login);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state).toEqual({
      currentUser: null,
      token: mockResponse.data.token,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('login thunk should return error if email or password is incorrect', async () => {
    // Arrange
    const args = {
      email: 'invalid-email',
      password: 'invalid-password',
    };
    const mockResponse = {
      status: 'error',
      message: 'Invalid email or password',
    };
    mockLoginApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/login', APIAuth.login);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state).toEqual({
      currentUser: null,
      token: null,
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('register thunk should register new user and return success status', async () => {
    // Arrange
    const args = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const mockResponse = {
      status: 'success',
      message: 'User created',
      data: {
        user: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    mockRegisterApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/register', APIAuth.register);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state).toEqual({
      currentUser: null,
      token: null,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('register thunk should return error if email is already registered', async () => {
    // Arrange
    const args = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const mockResponse = {
      status: 'error',
      message: 'Email already registered',
    };
    mockRegisterApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/register', APIAuth.register);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state).toEqual({
      currentUser: null,
      token: null,
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('getCurrentUser thunk should return current user data and success status', async () => {
    // Arrange
    const args = 'token';
    const mockResponse = {
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    mockGetCurrentUserApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/getCurrentUser', APIUsers.getCurrentUser);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state.currentUser).toEqual(mockResponse.data.user);
    expect(state.status).toBe('success');
    expect(state.message).toBe(mockResponse.message);
  });

  it('getCurrentUser thunk should return error if token is invalid', async () => {
    // Arrange
    const args = 'invalid-token';
    const mockResponse = {
      status: 'error',
      message: 'Invalid token',
    };
    mockGetCurrentUserApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('auth/getCurrentUser', APIUsers.getCurrentUser);
    await store.dispatch(thunk(args));

    // Assert
    const state = authSelector(store.getState());
    expect(state).toEqual({
      currentUser: null,
      token: null,
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('logout action updates state correctly', async () => {
    // Arrange
    store.dispatch(logout());

    // Action
    const state = authSelector(store.getState());

    // Assert
    expect(localStorage.getItem('persist:root')).toBe(null);
    expect(state).toEqual({
      currentUser: null,
      token: null,
      status: 'idle',
      message: '',
    });
  });

  it('resetStatusAuth action resets status and message correctly', async () => {
    // Arrange
    store.dispatch(resetStatusAuth());

    // Action
    const state = authSelector(store.getState());

    // Assert
    expect(state.status).toBe('idle');
    expect(state.message).toBe('');
  });
});
