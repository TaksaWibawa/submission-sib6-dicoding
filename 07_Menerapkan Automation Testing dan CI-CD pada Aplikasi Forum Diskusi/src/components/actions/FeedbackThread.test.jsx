import React from 'react';
import { authReducer, logout } from '@/stores/slices';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { http } from 'msw';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { APIUsers } from '@/apis';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { FeedbackThread } from './FeedbackThread';
import '@testing-library/jest-dom/vitest';

/* FeedbackThread Test Scenario
  1. FeedbackThread renders correctly
  2. FeedbackThread handles votes correctly
*/

const handlers = [
  http.post('/threads/:threadId/:voteType', (req, res, ctx) => res(ctx.json({ success: true }))),
  http.post('/threads/:threadId/comments/:commentId/:voteType', (req, res, ctx) =>
    res(ctx.json({ success: true }))
  ),
];

const server = setupServer(...handlers);
let store;
let mockApi;

describe('FeedbackThread', () => {
  beforeAll(async () => {
    server.listen();
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    mockApi = vi.spyOn(APIUsers, 'getCurrentUser');
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
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => {
    server.close();
    store.dispatch(logout());
  });

  it('FeedbackThread renders correctly', async () => {
    render(
      <Provider store={store}>
        <FeedbackThread
          totalLikes={10}
          totalDislikes={5}
          initialVoteStatus="neutral-vote"
        />
      </Provider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('FeedbackThread handles votes correctly', async () => {
    const mockOnVote = vi.fn();
    render(
      <Provider store={store}>
        <FeedbackThread
          totalLikes={10}
          totalDislikes={5}
          initialVoteStatus="neutral-vote"
          onVote={mockOnVote}
        />
      </Provider>
    );

    const upvoteButton = screen.getByLabelText('10');
    const downvoteButton = screen.getByLabelText('5');

    // Upvote
    fireEvent.click(upvoteButton);
    expect(mockOnVote).toHaveBeenCalledWith('up-vote');
    expect(upvoteButton).toHaveAttribute('aria-label', '11');

    // Downvote
    fireEvent.click(downvoteButton);
    expect(mockOnVote).toHaveBeenCalledWith('down-vote');
    expect(downvoteButton).toHaveAttribute('aria-label', '6');
    expect(upvoteButton).toHaveAttribute('aria-label', '10');

    // Neutralize vote
    fireEvent.click(downvoteButton);
    expect(mockOnVote).toHaveBeenCalledWith('neutral-vote');
    expect(downvoteButton).toHaveAttribute('aria-label', '5');
    expect(upvoteButton).toHaveAttribute('aria-label', '10');
  });
});
