import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelector } from '@/stores/slices';

export function PrivateRoute({ children }) {
  const { currentUser } = useSelector(authSelector);

  return currentUser ? children : <Navigate to="/unauthorized" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
