import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { authReducer, threadsReducer } from '@/stores/slices';
import { APIUsers } from '@/apis';
import { ThreadList } from './ThreadList';
import '@testing-library/jest-dom/vitest';

/* ThreadList Test Scenario
  1. Should render threads correctly when threads are provided
  2. Should render "No threads available" when no threads are provided
*/

const mockThreads = [
  {
    id: '1',
    title: 'Test Thread 1',
    body: 'This is a test thread 1',
    category: 'Test Category 1',
    threadInfo: {
      totalLikes: 10,
      totalDislikes: 2,
      createdAt: '2022-01-01T00:00:00Z',
    },
    upVotesBy: [],
    downVotesBy: [],
  },
  {
    id: '2',
    title: 'Test Thread 2',
    body: 'This is a test thread 2',
    category: 'Test Category 2',
    threadInfo: {
      totalLikes: 5,
      totalDislikes: 1,
      createdAt: '2022-01-01T00:00:00Z',
    },
    upVotesBy: [],
    downVotesBy: [],
  },
  {
    id: '3',
    title: 'Test Thread 3',
    body: 'This is a test thread 3',
    category: 'Test Category 3',
    threadInfo: {
      totalLikes: 3,
      totalDislikes: 0,
      createdAt: '2022-01-01T00:00:00Z',
    },
    upVotesBy: [],
    downVotesBy: [],
  },
];

describe('ThreadList component', () => {
  let store;
  beforeAll(async () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        threads: threadsReducer,
      },
    });

    const mockApi = vi.spyOn(APIUsers, 'getCurrentUser');
    const args = 'token';
    mockApi.mockResolvedValue({
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    });

    const thunk = createAsyncThunk('auth/getCurrentUser', APIUsers.getCurrentUser);
    await store.dispatch(thunk(args));
  });

  afterEach(() => {
    cleanup();
  });

  it('renders threads correctly when threads are provided', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThreadList threads={mockThreads} />
        </Provider>
      </BrowserRouter>
    );

    const threadCards = screen.getAllByRole('article');
    expect(threadCards).toHaveLength(mockThreads.length);

    mockThreads.forEach((thread) => {
      expect(screen.getByText(thread.title)).toBeInTheDocument();
      expect(screen.getByText(thread.body)).toBeInTheDocument();
      expect(screen.getByLabelText(thread.category)).toBeInTheDocument();
      expect(screen.getByText(thread.threadInfo.totalLikes)).toBeInTheDocument();
      expect(screen.getByText(thread.threadInfo.totalDislikes)).toBeInTheDocument();
    });
  });

  it('renders "No threads available" when no threads are provided', () => {
    render(
      <Provider store={store}>
        <ThreadList threads={[]} />
      </Provider>
    );

    expect(screen.getByText('No threads available')).toBeInTheDocument();
  });
});
