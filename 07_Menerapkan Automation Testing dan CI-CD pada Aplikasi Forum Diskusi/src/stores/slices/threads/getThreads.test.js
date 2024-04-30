import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';
import { filterThreads, resetThreads, threadsReducer, threadsSelector } from './getThreads';

/* getThreads Test Scenario
  1. Should return the initial state
  2. getThreads thunk should get threads and return success status
  3. getThreads thunk should return error if threads not found
  4. filterThreads action should filter threads by category
  5. filterThreads action should return all threads if tag is empty
  6. resetThreads action should reset threads state
*/

describe('threads/getThreads', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });

    mockApi = vi.spyOn(APIThreads, 'getThreads');
  });

  afterEach(() => {
    store.dispatch(resetThreads());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: [],
      filteredData: [],
      status: 'idle',
      message: '',
    };

    // Action
    const state = threadsReducer(undefined, { type: 'unknown' });

    // Assert
    expect(state).toEqual(initialState);
  });

  it('getThreads thunk should get threads and return success status', async () => {
    // Arrange
    const mockResponse = {
      status: 'success',
      message: 'ok',
      data: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/getThreads', APIThreads.getThreads);
    await store.dispatch(thunk());

    // Assert
    const state = threadsSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.threads,
      filteredData: mockResponse.data.threads,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('getThreads thunk should return error if threads not found', async () => {
    // Arrange
    const mockResponse = {
      status: 'error',
      message: 'Threads not found',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/getThreads', APIThreads.getThreads);
    await store.dispatch(thunk());

    // Assert
    const state = threadsSelector(store.getState());
    expect(state).toEqual({
      data: [],
      filteredData: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('filterThreads action should filter threads by category', async () => {
    // Arrange
    const args = 'tag';
    const mockState = {
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'tag',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    // Action
    store.dispatch({
      type: 'threads/getThreads/fulfilled',
      payload: { data: { threads: mockState.data } },
    });
    store.dispatch(filterThreads(args));

    // Assert
    const state = threadsSelector(store.getState());
    expect(state.filteredData).toEqual([mockState.data[0]]);
  });

  it('filterThreads action should return all threads if tag is empty', async () => {
    // Arrange
    const args = '';
    const mockState = {
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'tag',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    // Action
    store.dispatch({
      type: 'threads/getThreads/fulfilled',
      payload: { data: { threads: mockState.data } },
    });
    store.dispatch(filterThreads(args));

    // Assert
    const state = threadsSelector(store.getState());
    expect(state.filteredData).toEqual(mockState.data);
  });

  it('resetThreads action should reset threads state', () => {
    // Arrange
    store.dispatch(resetThreads());

    // Action
    const state = threadsSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      filteredData: [],
      status: 'idle',
      message: '',
    });
  });
});
