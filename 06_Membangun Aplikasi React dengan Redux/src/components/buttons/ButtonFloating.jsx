import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@chakra-ui/react';

export function ButtonFloating({ name, icon, placement, onClick }) {
  return (
    <Tooltip
      label={name}
      color="dark.100"
      bg="white"
      placement={placement}
      hasArrow
    >
      <IconButton
        name={name}
        icon={icon}
        onClick={onClick}
        size="lg"
        borderRadius="full"
        bgColor="brand"
        color="white"
        position="fixed"
        bottom="2rem"
        right="3rem"
        _hover={{
          bgColor: 'brand',
        }}
      />
    </Tooltip>
  );
}

ButtonFloating.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  placement: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ButtonFloating.defaultProps = {
  onClick: () => {},
};
