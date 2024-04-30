import { isFulfilled } from '@reduxjs/toolkit';
import { utils } from '@/utils';
import { setTags } from '../slices';

export const middlewareTags = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (isFulfilled(action) && action.type.includes('getThreads')) {
    const threads = action.payload?.data?.threads;

    const uniqueTags = utils.getUniqueValues(threads, 'category');

    storeAPI.dispatch(setTags(uniqueTags));
  }

  return result;
};
