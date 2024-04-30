import { isFulfilled, isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { setToast } from '../slices';

export const middlewareToast = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const actionTypeIncludes = (keyword) => action.type.includes(keyword);

  if (isFulfilled(action)) {
    if (actionTypeIncludes('threads') && !actionTypeIncludes('createComment')) {
      return result;
    }

    if (actionTypeIncludes('getUsers') || actionTypeIncludes('getCurrentUser')) {
      return result;
    }

    storeAPI.dispatch(
      setToast({ title: 'Success', description: action.payload?.message, status: 'success' })
    );
  } else if (isRejectedWithValue(action) || isRejected(action)) {
    storeAPI.dispatch(
      setToast({
        title: 'Error',
        description: action.payload?.message || action.error?.message,
        status: 'error',
      })
    );
  }

  return result;
};
