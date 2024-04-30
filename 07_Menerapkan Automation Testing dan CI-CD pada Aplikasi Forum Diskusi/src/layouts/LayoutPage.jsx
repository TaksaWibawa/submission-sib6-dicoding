import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { SpinnerLoading } from '@/components';
import { usersSelector } from '@/stores/slices';

export function LayoutPage({ children, status }) {
  const { status: userStatus } = useSelector(usersSelector);

  const isLoading = status === 'loading' || userStatus === 'loading';

  return (
    <Grid
      as="main"
      color="white"
      columnGap="2.5rem"
      padding="1.5rem 2.5rem"
      position="relative"
      templateColumns="2fr 2fr 1.25fr"
    >
      {isLoading && (
        <GridItem
          as="section"
          alignItems="center"
          colSpan={3}
          display="flex"
          justifyContent="center"
          minHeight="calc(100vh - 10rem)"
        >
          <SpinnerLoading />
        </GridItem>
      )}
      {!isLoading && children}
    </Grid>
  );
}

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string,
};

LayoutPage.defaultProps = {
  status: 'idle',
};
