import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelector } from '@/stores/slices';

export function ProtectedRoute({ children }) {
  const { currentUser } = useSelector(authSelector);

  return currentUser ? <Navigate to="/" /> : children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
