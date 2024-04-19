import React from 'react';
import {
  PageCreateThread,
  PageDetailThread,
  PageHome,
  PageLeaderboards,
  PageLogin,
  PageRegister,
} from '@/pages';
import { PageResponse } from '@/pages/PageResponse';

export const FEATURES = {
  home: <PageHome />,
  thread: <PageDetailThread />,
  'thread-create': <PageCreateThread />,
  leaderboards: <PageLeaderboards />,
  login: <PageLogin />,
  register: <PageRegister />,
  'not-found': (
    <PageResponse
      statusCode={404}
      message="Page not found"
      fallback="/"
      fallbackMessage="Go to home"
    />
  ),
  unauthorized: (
    <PageResponse
      statusCode={401}
      message="Unauthorized"
      fallback="/login"
      fallbackMessage="Go to login"
    />
  ),
};
