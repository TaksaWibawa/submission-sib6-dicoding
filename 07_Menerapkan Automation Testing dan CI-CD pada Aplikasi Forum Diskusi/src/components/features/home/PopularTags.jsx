import React from 'react';
import PropTypes from 'prop-types';
import { GridItem } from '@chakra-ui/react';
import { CardTagsVertical } from '@/components/cards';

export function PopularTags({ tags, handleFilterTag }) {
  return (
    <GridItem
      as="aside"
      colSpan={1}
      gap={4}
      height="fit-content"
      position="sticky"
      top="7rem"
    >
      <CardTagsVertical
        tags={tags}
        onFilterByTag={handleFilterTag}
      />
    </GridItem>
  );
}

PopularTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
  handleFilterTag: PropTypes.func,
};

PopularTags.defaultProps = {
  tags: [],
  handleFilterTag: () => {},
};
