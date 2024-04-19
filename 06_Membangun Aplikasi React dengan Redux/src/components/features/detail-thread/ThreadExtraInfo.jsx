import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Flex, HStack, Text } from '@chakra-ui/react';
import { FeedbackThread } from '@/components/actions';
import { useParams } from 'react-router-dom';
import { useVote } from '@/hooks';

export function ThreadExtraInfo({ threadInfo }) {
  const threadId = useParams().id;
  const { voteStatus, setVoteStatus } = useVote(
    threadInfo?.upVotesBy,
    threadInfo?.downVotesBy,
    threadId
  );

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      width="100%"
      mt={4}
    >
      <FeedbackThread
        totalLikes={threadInfo.totalLikes}
        totalDislikes={threadInfo.totalDislikes}
        initialVoteStatus={voteStatus}
        onVote={setVoteStatus}
      />
      <HStack spacing={2}>
        <Text
          fontSize="sm"
          color="secondary-light"
        >
          {threadInfo.createdAt}
        </Text>
        <Text
          fontSize="sm"
          color="secondary-light"
        >
          •
        </Text>
        <Avatar
          size="xs"
          name={threadInfo.author}
          src={threadInfo.avatar}
        />
        <Text
          fontSize="sm"
          color="secondary-light"
        >
          {threadInfo.author}
        </Text>
      </HStack>
    </Flex>
  );
}

ThreadExtraInfo.propTypes = {
  threadInfo: PropTypes.shape({
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    totalLikes: PropTypes.number,
    totalDislikes: PropTypes.number,
    createdAt: PropTypes.string,
    author: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

ThreadExtraInfo.defaultProps = {
  threadInfo: {
    upVotesBy: [],
    downVotesBy: [],
    totalLikes: 0,
    totalDislikes: 0,
    createdAt: '',
    author: '',
    avatar: '',
  },
};
