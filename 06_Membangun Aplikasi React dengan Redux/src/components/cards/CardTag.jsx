import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { tagsSelector } from '@/stores/slices';

export function CardTag({ tagName, threadCount, onClick }) {
  const { selectedTag } = useSelector(tagsSelector);
  const isActive = selectedTag.toLowerCase() === tagName.toLowerCase();

  return (
    <Tooltip
      label={`Click to ${isActive ? 'clear filter' : 'set filter'} by ${tagName}`}
      aria-label="thread count"
      hasArrow
      placement="bottom"
      bgColor="secondary-light"
      color="dark.300"
    >
      <Flex
        onClick={() => onClick(tagName)}
        alignItems="center"
        gap={{ base: 2, lg: 4 }}
        p={2}
        borderRadius="lg"
        bgColor={isActive && 'dark.300'}
        color={isActive && 'white'}
        _hover={{
          bgColor: 'dark.300',
          cursor: 'pointer',

          '.tag-icon': {
            bgColor: 'dark.200',
            color: 'white',
          },

          '.thread-count': {
            color: 'white',
          },
        }}
      >
        <Box
          className="tag-icon"
          justifyContent="center"
          fontSize={{ base: '0.75rem', lg: '1rem' }}
          display="flex"
          bgColor={isActive ? 'brand' : 'secondary-light'}
          color={isActive ? 'white' : 'dark.200'}
          boxSize={{ base: 6, lg: 8 }}
          borderRadius="lg"
          alignItems="center"
        >
          <FaHashtag />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            className="tag-name"
            fontSize={{ base: '0.75rem', lg: '1rem' }}
            fontWeight="semibold"
            textTransform="capitalize"
            textDecoration={isActive && 'underline'}
            isTruncated
            maxW={{ base: '5rem', lg: '10rem' }}
          >
            {tagName}
          </Text>
          <Text
            className="thread-count"
            fontSize={{ base: '0.6rem', lg: '0.75rem' }}
            fontWeight={400}
            color={isActive ? 'secondary-light' : 'secondary-dark'}
          >
            {threadCount} Posted Threads
          </Text>
        </Flex>
      </Flex>
    </Tooltip>
  );
}

CardTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  threadCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
