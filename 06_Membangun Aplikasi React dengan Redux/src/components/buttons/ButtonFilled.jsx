import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

export function ButtonFilled({ text, icon, onClick, type, padding, ...props }) {
  return (
    <Button
      type={type}
      onClick={onClick}
      bgColor="white"
      color="dark.100"
      variant="filled"
      padding={padding}
      _hover={{
        bgColor: 'gray.200',
      }}
      leftIcon={icon}
      {...props}
    >
      {text}
    </Button>
  );
}

ButtonFilled.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  padding: PropTypes.string,
};

ButtonFilled.defaultProps = {
  icon: null,
  onClick: () => {},
  type: 'button',
  padding: '1.5rem',
};
