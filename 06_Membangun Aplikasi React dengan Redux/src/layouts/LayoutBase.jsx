import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@chakra-ui/react';
import { Navbar, Toast } from '@/components';

export function LayoutBase({ children }) {
  return (
    <Container
      margin={0}
      padding={0}
      maxW="container.2xl"
      minH="100vh"
      bgColor="dark.300"
    >
      <Navbar />
      {children}
      <Toast />
    </Container>
  );
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
};
