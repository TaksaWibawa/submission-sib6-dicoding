import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { APILeaderboards } from '@/apis';
import {
  getLeaderboardsReducer,
  getLeaderboardsSelector,
  resetLeaderboards,
} from './getLeaderboards';

/* getLeaderboards Test Scenario
  1. Should return the initial state
  2. getLeaderboards thunk should get leaderboards and return success status
  3. getLeaderboards thunk should return error if leaderboards not found
  4. resetLeaderboards action should reset state correctly
*/

describe('leaderboards/getLeaderboards', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        leaderboards: getLeaderboardsReducer,
      },
    });

    mockApi = vi.spyOn(APILeaderboards, 'getLeaderboards');
  });

  afterEach(() => {
    store.dispatch(resetLeaderboards());
  });

  it('should return the initial state', async () => {
    // Arrange
    const initialState = {
      data: [],
      status: 'idle',
      message: '',
    };

    // Action
    const state = getLeaderboardsReducer(undefined, { type: 'unknown' });

    // Assert
    expect(state).toEqual(initialState);
  });

  it('getLeaderboards thunk should get leaderboards and return success status', async () => {
    // Arrange
    const mockResponse = {
      status: 'success',
      message: 'Leaderboards found',
      data: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('leaderboards/getLeaderboards', APILeaderboards.getLeaderboards);
    await store.dispatch(thunk());

    // Assert
    const state = getLeaderboardsSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.leaderboards,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('getLeaderboards thunk should return error if leaderboards not found', async () => {
    // Arrange
    const mockResponse = {
      status: 'error',
      message: 'Leaderboards not found',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('leaderboards/getLeaderboards', APILeaderboards.getLeaderboards);
    await store.dispatch(thunk());

    // Assert
    const state = getLeaderboardsSelector(store.getState());
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetLeaderboards action should reset state correctly', async () => {
    // Arrange
    store.dispatch(resetLeaderboards());

    // Action
    const state = getLeaderboardsSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      status: 'idle',
      message: '',
    });
  });
});
