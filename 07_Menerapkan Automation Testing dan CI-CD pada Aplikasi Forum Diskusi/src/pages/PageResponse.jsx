import React from 'react';
import PropTypes from 'prop-types';
import { LayoutPage } from '@/layouts';
import { GridItem, Heading } from '@chakra-ui/react';
import { ButtonFilled } from '@/components';
import { useNavigate } from 'react-router-dom';

const STATUS_CODE = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page not found',
  500: 'Internal server error',
};

export function PageResponse({ statusCode, message, fallback, fallbackMessage }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (fallback) {
      navigate(fallback);
    }
  };
  return (
    <LayoutPage>
      <GridItem
        as="section"
        alignItems="center"
        colSpan={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="calc(100vh - 10rem)"
        gap={4}
      >
        <Heading
          as="h1"
          size="3xl"
        >
          {statusCode}
        </Heading>
        <Heading
          as="h1"
          size="xl"
        >
          {message || STATUS_CODE[statusCode]}
        </Heading>
        <ButtonFilled
          onClick={handleNavigate}
          text={fallbackMessage}
          padding="1.5rem 2.5rem"
        />
      </GridItem>
    </LayoutPage>
  );
}

PageResponse.propTypes = {
  statusCode: PropTypes.number,
  message: PropTypes.string,
  fallback: PropTypes.string,
  fallbackMessage: PropTypes.string,
};

PageResponse.defaultProps = {
  statusCode: 404,
  message: 'Page not found',
  fallback: '/',
  fallbackMessage: 'Back to Home',
};
