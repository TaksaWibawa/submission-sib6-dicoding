import React from 'react';
import PropTypes from 'prop-types';
import { Flex, GridItem, Heading } from '@chakra-ui/react';
import { CardTag } from './CardTag';

export function CardTagsHorizontal({ tags, handleFilterTag }) {
  return (
    <GridItem
      as="aside"
      colSpan={2}
      mb={4}
    >
      <Heading
        as="h2"
        size="lg"
        color="secondary-light"
        textAlign="center"
        pb={4}
        textDecoration="underline"
      >
        Popular Tags
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={4}
        flexWrap="wrap"
      >
        {tags.slice(0, 4).map((tag) => (
          <CardTag
            tagName={tag.value}
            threadCount={tag.count}
            onClick={handleFilterTag}
            key={tag.value}
          />
        ))}
      </Flex>
    </GridItem>
  );
}

CardTagsHorizontal.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
  handleFilterTag: PropTypes.func,
};

CardTagsHorizontal.defaultProps = {
  tags: [],
  handleFilterTag: () => {},
};
