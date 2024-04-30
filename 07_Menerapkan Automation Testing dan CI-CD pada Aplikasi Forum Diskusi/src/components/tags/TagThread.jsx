import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@chakra-ui/react';

export function TagThread({ text, size }) {
  return (
    <Tag
      aria-label={text}
      size={size}
      fontWeight="semibold"
      bgColor="dark.100"
      color="#C5D0E6"
      textTransform="lowercase"
      padding="0.25rem 0.5rem"
    >
      #{text}
    </Tag>
  );
}

TagThread.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
};

TagThread.defaultProps = {
  text: '',
  size: 'md',
};
