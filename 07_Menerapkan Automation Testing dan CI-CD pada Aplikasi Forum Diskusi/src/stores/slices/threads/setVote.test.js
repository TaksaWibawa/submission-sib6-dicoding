import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIThreads } from '@/apis';
import { resetVote, setVoteReducer, setVoteSelector } from './setVotes';

/* setVote Test Scenario
  1. Should return the initial state
  2. setVoteThread thunk should able to vote thread and return success status
  3. setVoteThread thunk should return error if any field is empty
  4. setVoteComment thunk should able to vote comment and return success status
  5. setVoteComment thunk should return error if any field is empty
  6. resetVote action should reset state correctly
*/

describe('threads/setVote', () => {
  let store;
  let mockVoteThreadApi;
  let mockVoteCommentApi;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        vote: setVoteReducer,
      },
    });

    mockVoteThreadApi = vi.spyOn(APIThreads, 'setVoteThread');
    mockVoteCommentApi = vi.spyOn(APIThreads, 'setVoteComment');
  });

  afterEach(() => {
    store.dispatch(resetVote());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      data: [],
      status: 'idle',
      message: '',
    };

    // Action
    const reducer = setVoteReducer(undefined, { type: 'unknown' });

    // Assert
    expect(reducer).toEqual(initialState);
  });

  it('setVoteThread thunk should set vote on thread and return success status', async () => {
    // Arrange
    const args = { threadId: 'thread-1', voteType: 1 };
    const mockResponse = {
      status: 'success',
      message: 'Thread upvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1,
        },
      },
    };
    mockVoteThreadApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/setVoteThread', APIThreads.setVoteThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = setVoteSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.vote,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('setVoteThread thunk should return error if any field is empty', async () => {
    // Arrange
    const args = { threadId: '', voteType: null };
    const mockResponse = {
      status: 'error',
      message: 'Internal server error',
    };
    mockVoteThreadApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/setVoteThread', APIThreads.setVoteThread);
    await store.dispatch(thunk(args));

    // Assert
    const state = setVoteSelector(store.getState());
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('setVoteComment thunk should set vote on comment and return success status', async () => {
    // Arrange
    const args = { commentId: 'comment-1', threadId: 'thread-1', voteType: 1 };
    const mockResponse = {
      status: 'success',
      message: 'Comment upvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: 1,
        },
      },
    };
    mockVoteCommentApi.mockResolvedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/setVoteComment', APIThreads.setVoteComment);
    await store.dispatch(thunk(args));

    // Assert
    const state = setVoteSelector(store.getState());
    expect(state).toEqual({
      data: mockResponse.data.vote,
      status: 'success',
      message: mockResponse.message,
    });
  });

  it('setVoteComment thunk should return error if any field is empty', async () => {
    // Arrange
    const args = { commentId: '', threadId: '', voteType: null };
    const mockResponse = {
      status: 'error',
      message: 'Internal server error',
    };
    mockVoteCommentApi.mockRejectedValue(mockResponse);

    // Action
    const thunk = createAsyncThunk('threads/setVoteComment', APIThreads.setVoteComment);
    await store.dispatch(thunk(args));

    // Assert
    const state = setVoteSelector(store.getState());
    expect(state).toEqual({
      data: [],
      status: 'error',
      message: mockResponse.message,
    });
  });

  it('resetVote action should reset state correctly', () => {
    // Arrange
    store.dispatch(resetVote());

    // Action
    const state = setVoteSelector(store.getState());

    // Assert
    expect(state).toEqual({
      data: [],
      status: 'idle',
      message: '',
    });
  });
});
