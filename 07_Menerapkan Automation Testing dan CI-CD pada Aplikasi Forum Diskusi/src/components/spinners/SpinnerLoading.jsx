import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@chakra-ui/react';

export function SpinnerLoading({ size, thickness, speed }) {
  return (
    <Spinner
      thickness={thickness}
      speed={speed}
      color="brand"
      boxSize={size}
    />
  );
}

SpinnerLoading.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.string,
  speed: PropTypes.string,
};

SpinnerLoading.defaultProps = {
  size: 200,
  thickness: '8px',
  speed: '0.65s',
};
