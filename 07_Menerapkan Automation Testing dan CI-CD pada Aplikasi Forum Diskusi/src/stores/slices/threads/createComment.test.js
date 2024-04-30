import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';
import { createCommentReducer, createCommentSelector, resetCreateComment } from './createComment';

/* createComment Test Scenario
  1. Should return the initial state
  2. createComment thunk should create comment and return success status
  3. createComment thunk should return error if thread not found
  4. resetCreateComment action should reset create comment state
*/

describe('threads/createComment', () => {
  let store;
  let mockApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        createComment: createCommentReducer,
      },
    });

    mockApi = vi.spyOn(APIThreads, 'createComment');
  });

  afterEach(() => {
    store.dispatch(resetCreateComment());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: [],
      status: 'idle',
      message: '',
    };

    // Action
    const reducer = createCommentReducer(undefined, { type: 'unknown' });

    // Assert
    expect(reducer).toEqual(initialState);
  });

  it('createComment thunk should return success status', async () => {
    // Arrange
    const args = { threadId: 1, content: 'Hello, World!' };
    const mockResponse = {
      status: 'success',
      message: 'Comment created',
      data: {
        comment: {
          id: '1',
          userId: 1,
          threadId: 1,
          content: 'Hello, World!',
          createdAt: '2021-08-01T00:00:00.000Z',
          updatedAt: '2021-08-01T00:00:00.000Z',
        },
      },
    };
    mockApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/createComment', APIThreads.createComment);
    await store.dispatch(thunk(args));

    // Assert
    const state = createCommentSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.comment,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('createComment thunk should return error status', async () => {
    // Arrange
    const args = { threadId: 1, content: 'Hello, World!' };
    const mockResponse = {
      status: 'error',
      message: 'Internal server error',
    };
    mockApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/createComment', APIThreads.createComment);
    await store.dispatch(thunk(args));

    // Assert
    const state = store.getState().createComment;
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetCreateComment should reset the state', () => {
    // Arrange
    store.dispatch(resetCreateComment());

    // Action
    const state = createCommentSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      status: 'idle',
      message: '',
    });
  });
});
