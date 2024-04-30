import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';
import { detailThreadReducer, detailThreadSelector, resetDetailThread } from './getDetailThread';

/* getDetailThread Test Scenario
  1. Should return the initial state
  2. getDetailThread thunk should get detail thread and return success status
  3. getDetailThread thunk should return error if id is not found
  4. resetDetailThread action should reset state correctly
*/

describe('threads/getDetailThread', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        detailThread: detailThreadReducer,
      },
    });

    mockApi = vi.spyOn(APIThreads, 'getDetailThread');
  });

  afterEach(() => {
    store.dispatch(resetDetailThread());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: [],
      status: 'idle',
      message: '',
    };

    // Action
    const state = detailThreadReducer(undefined, { type: 'unknown' });

    // Assert
    expect(state).toEqual(initialState);
  });

  it('getDetailThread thunk should get detail thread and return success status', async () => {
    // Arrange
    const args = 'thread';
    const mockResponse = {
      status: 'success',
      message: 'Thread found',
      data: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/getDetailThread', APIThreads.getDetailThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = detailThreadSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.detailThread,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('getDetailThread thunk should return error if id is not found', async () => {
    // Arrange
    const args = 'invalid-id';
    const mockResponse = {
      status: 'error',
      message: 'Thread not found',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/getDetailThread', APIThreads.getDetailThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = detailThreadSelector(store.getState());
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetDetailThread action should reset state correctly', async () => {
    // Arrange
    store.dispatch(resetDetailThread());

    // Action
    const state = detailThreadSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      status: 'idle',
      message: '',
    });
  });
});
