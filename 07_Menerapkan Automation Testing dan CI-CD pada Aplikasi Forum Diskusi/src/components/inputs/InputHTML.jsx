import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';

export function InputHTML({ name, placeholder, onInput, error, ...props }) {
  return (
    <Box
      name={name}
      whiteSpace="pre-wrap"
      contentEditable="true"
      minHeight="100px"
      maxHeight="200px"
      border="2px solid"
      borderColor={error ? 'red.500' : 'secondary-dark'}
      borderRadius="md"
      py="10px"
      px="15px"
      overflow="auto"
      placeholder={placeholder}
      css={css`
        &:empty:before {
          content: attr(placeholder);
          color: ${error ? '#e53e3e' : '#97989D'};
        }
      `}
      onInput={(event) => onInput(event.currentTarget.innerHTML)}
      {...props}
    />
  );
}

InputHTML.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

InputHTML.defaultProps = {
  name: '',
  error: false,
};
