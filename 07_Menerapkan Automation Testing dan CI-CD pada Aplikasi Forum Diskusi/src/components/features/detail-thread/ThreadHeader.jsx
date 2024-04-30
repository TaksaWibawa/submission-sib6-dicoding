import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Flex, Heading } from '@chakra-ui/react';
import { TagThread } from '@/components/tags';

export function ThreadHeader({ title, category }) {
  return (
    <>
      <Flex>
        <TagThread
          text={category}
          size="lg"
        />
      </Flex>
      <Heading
        as="h1"
        fontSize="calc(1.5rem + 1.5vw)"
        fontWeight="bold"
        lineHeight="shorter"
      >
        {title}
      </Heading>
      <Divider />
    </>
  );
}

ThreadHeader.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

ThreadHeader.defaultProps = {
  title: '',
  category: '',
};
