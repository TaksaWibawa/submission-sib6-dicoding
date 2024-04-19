import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Flex } from '@chakra-ui/react';
import { CardTag } from './CardTag';

export function CardTagsVertical({ tags, onFilterByTag }) {
  return (
    <Card
      width="100%"
      p={2}
      orientation="vertical"
      height="fit-content"
      color="secondary-light"
      borderRadius="1rem"
      bg="dark.200"
      alignSelf="flex-start"
    >
      <CardHeader
        textAlign="center"
        fontSize="1.5rem"
        fontWeight="semibold"
        pb={2}
      >
        Popular Tags
      </CardHeader>
      <CardBody
        pt="5px"
        pb={4}
      >
        <Flex
          flexDirection="column"
          gap={2}
        >
          {tags.slice(0, 4).map((tag) => (
            <CardTag
              key={tag.value}
              tagName={tag.value}
              threadCount={tag.count}
              onClick={onFilterByTag}
            />
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}

CardTagsVertical.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  onFilterByTag: PropTypes.func.isRequired,
};
