import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutBase } from './layouts';
import RoutesBase from './routes';
import { authSelector, getCurrentUser, getUsers, resetUsers } from './stores/slices';

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getUsers());
    if (token) {
      dispatch(getCurrentUser());
    }
    return () => dispatch(resetUsers());
  }, [dispatch, token]);

  return (
    <LayoutBase>
      <RoutesBase />
    </LayoutBase>
  );
}
