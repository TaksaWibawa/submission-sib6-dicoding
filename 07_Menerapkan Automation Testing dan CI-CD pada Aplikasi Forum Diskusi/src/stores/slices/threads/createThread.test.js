import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';
import { createThreadReducer, createThreadSelector, resetCreateThread } from './createThread';

/* createThread Test Scenario
  1. Should return the initial state
  2. createThread thunk should create thread and return success status
  3. createThread thunk should return error if any field is empty except category which is optional
  4. resetCreateThread action should reset state correctly
*/

describe('threads/createComment', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        createThread: createThreadReducer,
      },
    });

    mockApi = vi.spyOn(APIThreads, 'createThread');
  });

  afterEach(() => {
    store.dispatch(resetCreateThread());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: {},
      status: 'idle',
      message: '',
    };

    // Action
    const reducer = createThreadReducer(undefined, { type: 'unknown' });

    // Assert
    expect(reducer).toEqual(initialState);
  });

  it('createThread thunk should return success status', async () => {
    // Arrange
    const args = { title: 'Hello, World!', body: 'Hello, World!', category: 'General' };
    const mockResponse = {
      status: 'success',
      message: 'Thread created',
      data: {
        thread: {
          id: 'thread-1',
          title: 'Hello, World!',
          body: 'Hello, World!',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/createThread', APIThreads.createThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = createThreadSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.thread,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('createThread thunk should return error if any field is empty except category which is optional', async () => {
    // Arrange
    const args = { title: '', body: '', category: 'General' };
    const mockResponse = {
      status: 'error',
      message: 'Internal server error',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/createThread', APIThreads.createThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = createThreadSelector(store.getState());
    expect(state).toEqual({
      data: {},
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetCreateThread should reset the state', () => {
    // Arrange
    store.dispatch(resetCreateThread());

    // Action
    const state = createThreadSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: {},
      status: 'idle',
      message: '',
    });
  });
});
