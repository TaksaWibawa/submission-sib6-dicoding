import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export function ButtonMenu({ menu, icon, onClick, path }) {
  const location = useLocation();
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      padding="1.5rem 1rem"
      borderRadius="0.5rem"
      bg="#2C353D"
      color="white"
      _hover={{ bg: 'white', color: 'black' }}
      isActive={location.pathname === path}
      _active={{
        bg: 'brand',
        color: 'white',
      }}
    >
      <VStack
        spacing={1}
        alignItems="center"
      >
        {icon}
        <Text
          fontSize="xs"
          textTransform="capitalize"
          fontWeight="semibold"
        >
          {menu}
        </Text>
      </VStack>
    </Button>
  );
}

ButtonMenu.propTypes = {
  menu: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
