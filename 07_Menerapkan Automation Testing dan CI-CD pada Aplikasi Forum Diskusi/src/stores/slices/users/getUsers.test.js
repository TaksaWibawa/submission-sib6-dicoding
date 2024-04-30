import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIUsers } from '@/apis';
import { resetUsers, usersReducer, usersSelector } from './getUsers';

/* getUsers Test Scenario
  1. Should return the initial state
  2. getUsers thunk should return users and success status
  3. getUsers thunk should return error if no users found
  4. resetUsers action should reset state correctly
*/

describe('users/getUsers', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    mockApi = vi.spyOn(APIUsers, 'getUsers');
  });

  afterEach(() => {
    store.dispatch(resetUsers());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: [],
      status: 'idle',
      message: '',
    };

    // Action
    const reducer = usersReducer(undefined, { type: 'unknown' });

    // Assert
    expect(reducer).toEqual(initialState);
  });

  it('getUsers thunk should return users and success status', async () => {
    // Arrange
    const mockResponse = {
      status: 'success',
      message: 'ok',
      data: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'fulan',
            name: 'Si Fulan',
            email: 'fulan@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('users/getUsers', APIUsers.getUsers);
    await store.dispatch(thunk());

    // Assert
    const state = usersSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.users,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('getUsers thunk should return error if no users found', async () => {
    // Arrange
    const mockResponse = {
      status: 'error',
      message: 'Internal server error',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('users/getUsers', APIUsers.getUsers);
    await store.dispatch(thunk());

    // Assert
    const state = usersSelector(store.getState());
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetUsers action should reset state correctly', () => {
    // Arrange
    store.dispatch(resetUsers());

    // Action
    const state = usersSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      status: 'idle',
      message: '',
    });
  });
});
