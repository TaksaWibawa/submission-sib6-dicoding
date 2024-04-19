import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import {
  createCommentReducer,
  createThreadReducer,
  detailThreadReducer,
  setVoteReducer,
  tagsReducer,
  threadsReducer,
} from './threads';
import { toastReducer } from './notifications';
import { usersReducer } from './users';
import { getLeaderboardsReducer } from './leaderboards';

export const rootReducer = combineReducers({
  auth: authReducer,
  createComment: createCommentReducer,
  createThread: createThreadReducer,
  detailThread: detailThreadReducer,
  leaderboards: getLeaderboardsReducer,
  tags: tagsReducer,
  threads: threadsReducer,
  toast: toastReducer,
  users: usersReducer,
  vote: setVoteReducer,
});
