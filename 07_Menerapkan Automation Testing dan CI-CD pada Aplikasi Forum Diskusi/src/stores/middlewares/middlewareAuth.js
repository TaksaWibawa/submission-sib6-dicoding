import { getCurrentUser } from '../slices';

export const middlewareAuth = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const { token } = storeAPI.getState();
  if (token) {
    storeAPI.dispatch(getCurrentUser());
  }

  return result;
};
