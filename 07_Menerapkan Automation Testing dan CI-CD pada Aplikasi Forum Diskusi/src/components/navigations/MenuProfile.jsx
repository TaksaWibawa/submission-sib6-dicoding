import React from 'react';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

export function MenuProfile({ name, email, avatar, onLogout }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="solid"
        padding={6}
        bgColor="dark.200"
        rightIcon={<FaBars />}
        color="secondary-light"
        _hover={{ bg: 'secondary-light', color: 'dark.200' }}
        _expanded={{ bg: 'secondary-light', color: 'dark.200' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Avatar
          src={avatar}
          size="sm"
          mr="4"
        />
      </MenuButton>
      <MenuList
        bg="dark.200"
        borderColor="secondary-light"
        boxShadow="sm"
        color="secondary-light"
        pb={0}
      >
        <Box
          px="3"
          py="1"
          fontWeight="bold"
          maxWidth="13rem"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            isTruncated
            textTransform="capitalize"
          >
            {name}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="normal"
            isTruncated
            textTransform="lowercase"
          >
            {email}
          </Text>
        </Box>
        <MenuDivider mb={0} />
        <MenuItem
          bg="transparent"
          _hover={{ bg: 'red.500' }}
          onClick={onLogout}
          py={2}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

MenuProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  onLogout: PropTypes.func,
};

MenuProfile.defaultProps = {
  name: '',
  email: '',
  avatar: '',
  onLogout: () => {},
};
