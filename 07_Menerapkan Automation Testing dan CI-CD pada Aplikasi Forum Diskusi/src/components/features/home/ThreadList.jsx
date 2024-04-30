import React from 'react';
import PropTypes from 'prop-types';
import { GridItem, Text } from '@chakra-ui/react';
import { utils } from '@/utils';
import { CardThread } from '@/components/cards';

export function ThreadList({ threads }) {
  return (
    <GridItem
      as="section"
      colSpan={{ base: 3, xl: 2 }}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {threads?.length > 0 ? (
        threads?.map((thread) => (
          <CardThread
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={utils.removeHTMLTags(thread.body)}
            category={thread.category}
            threadInfo={thread.threadInfo}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
          />
        ))
      ) : (
        <Text
          color="secondary-light"
          fontSize="1.25rem"
          fontWeight="semibold"
          textAlign="center"
        >
          No threads available
        </Text>
      )}
    </GridItem>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      threadInfo: PropTypes.shape({
        totalLikes: PropTypes.number,
        totalDislikes: PropTypes.number,
        createdAt: PropTypes.string,
      }),
    })
  ),
};

ThreadList.defaultProps = {
  threads: [],
};
