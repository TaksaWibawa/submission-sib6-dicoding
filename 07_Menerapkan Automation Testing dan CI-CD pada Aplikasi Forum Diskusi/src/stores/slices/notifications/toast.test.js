import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { clearToast, setToast, toastReducer } from './toast';

/* toast Test Scenario
  1. toastReducer should return the initial state
  2. setToast action updates state correctly
  3. clearToast action resets state correctly
*/

describe('notifications/toast', () => {
  let store;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        toast: toastReducer,
      },
    });
  });

  afterEach(() => {
    store.dispatch(clearToast());
  });

  it('toastReducer should return the initial state', () => {
    // Arrange
    const initialState = {
      title: '',
      description: '',
      status: '',
    };

    // Action
    const state = toastReducer(undefined, { type: 'unknown' });

    // Assert
    expect(state).toEqual(initialState);
  });

  it('setToast action updates state correctly', () => {
    // Arrange
    const payload = {
      title: 'Title',
      description: 'Description',
      status: 'success',
    };

    // Action
    store.dispatch(setToast(payload));

    // Assert
    const state = store.getState().toast;
    expect(state.title).toBe(payload.title);
    expect(state.description).toBe(payload.description);
    expect(state.status).toBe(payload.status);
  });

  it('clearToast action resets state correctly', () => {
    // Arrange
    const payload = {
      title: 'Title',
      description: 'Description',
      status: 'success',
    };

    // Action
    store.dispatch(setToast(payload));
    store.dispatch(clearToast());

    // Assert
    const state = store.getState().toast;
    expect(state.title).toBe('');
    expect(state.description).toBe('');
    expect(state.status).toBe('');
  });
});
