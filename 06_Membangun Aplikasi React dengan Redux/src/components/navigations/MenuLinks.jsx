import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { ButtonGroup, Divider, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '@/stores/slices';
import { ButtonFilled, ButtonMenu } from '../buttons';
import { MenuProfile } from './MenuProfile';

export function MenuLinks({ menuItems }) {
  const navigate = useNavigate();
  const { token, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleMenuClick = (menu) => {
    const menuItem = menuItems.find((item) => item.menu === menu);
    navigate(menuItem.path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Flex
      width="100%"
      justifyContent="flex-end"
    >
      <ButtonGroup spacing={4}>
        {menuItems.map((item) => (
          <ButtonMenu
            key={item.menu}
            menu={item.menu}
            icon={item.icon}
            onClick={() => handleMenuClick(item.menu)}
            path={item.path}
          />
        ))}
      </ButtonGroup>
      <Divider
        orientation="vertical"
        borderColor="gray.200"
        borderWidth="1px"
        marginInline={4}
        height="2.5rem"
      />
      <ButtonGroup spacing={4}>
        {!token && (
          <ButtonFilled
            text="Login"
            icon={<FaSignInAlt />}
            onClick={handleLogin}
          />
        )}

        {token && (
          <MenuProfile
            name={currentUser?.name}
            email={currentUser?.email}
            avatar={currentUser?.avatar}
            onLogout={handleLogout}
          />
        )}
      </ButtonGroup>
    </Flex>
  );
}

MenuLinks.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      menu: PropTypes.string,
      icon: PropTypes.node,
      path: PropTypes.string,
    })
  ),
};

MenuLinks.defaultProps = {
  menuItems: [],
};
