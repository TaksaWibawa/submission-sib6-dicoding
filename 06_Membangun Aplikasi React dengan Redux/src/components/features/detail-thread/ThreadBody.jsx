import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Flex } from '@chakra-ui/react';

export function ThreadBody({ body }) {
  return (
    <Flex
      flexDirection="column"
      fontSize="md"
      letterSpacing="tight"
      fontWeight="normal"
      textAlign="justify"
    >
      {typeof body === 'string' ? parse(body) : body}
    </Flex>
  );
}

ThreadBody.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ThreadBody.defaultProps = {
  body: '',
};
