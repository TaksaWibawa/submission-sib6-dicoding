import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { resetTags, setSelectedTag, setTags, tagsReducer, tagsSelector } from './tagThread';

/* tagThread Test Scenario
  1. Should return the initial state
  2. setTags action should set tags correctly
  3. setSelectedTag action should set selected tag correctly
  4. resetTags action should reset state correctly
*/

describe('threads/setVote', () => {
  let store;
  beforeAll(() => {
    store = configureStore({
      reducer: {
        tags: tagsReducer,
      },
    });
  });

  afterEach(() => {
    store.dispatch(resetTags());
  });

  it('should return the initial state', () => {
    // Arrange
    const initialState = {
      tags: [],
      selectedTag: '',
    };

    // Action
    const reducer = tagsReducer(undefined, { type: 'unknown' });

    // Assert
    expect(reducer).toEqual(initialState);
  });

  it('setTags action should set tags correctly', () => {
    // Arrange
    const args = ['tag-1', 'tag-2', 'tag-3'];

    // Action
    store.dispatch(setTags(args));

    // Assert
    const state = tagsSelector(store.getState());
    expect(state.tags).toEqual(args);
  });

  it('setSelectedTag action should set selected tag correctly', () => {
    // Arrange
    const args = 'tag-1';

    // Action
    store.dispatch(setSelectedTag(args));

    // Assert
    const state = tagsSelector(store.getState());
    expect(state.selectedTag).toEqual(args);
  });

  it('resetTags action should reset state correctly', () => {
    // Arrange
    store.dispatch(resetTags());

    // Action
    const state = tagsSelector(store.getState());

    // Assert
    expect(state).toEqual({
      tags: [],
      selectedTag: '',
    });
  });
});
