import React from 'react';
import PropTypes from 'prop-types';
import { Flex, HStack, Avatar, Text, Spacer } from '@chakra-ui/react';
import { FeedbackThread } from '@/components/actions';
import { utils } from '@/utils';
import { useVote } from '@/hooks';
import { useParams } from 'react-router-dom';
import { ThreadBody } from './ThreadBody';

export function ThreadComment({ comment, lastComment }) {
  const threadId = useParams().id;
  const { voteStatus, setVoteStatus } = useVote(
    comment?.upVotesBy,
    comment?.downVotesBy,
    threadId,
    comment?.id
  );

  return (
    <Flex
      flexDirection="column"
      key={comment.id}
      gap={2}
    >
      <HStack spacing={2}>
        <Avatar
          name={comment.owner.name}
          src={comment.owner.avatar}
          size="sm"
        />
        <Text
          fontSize="md"
          fontWeight="semibold"
        >
          {comment.owner.name}
        </Text>
        <Spacer />
        <Text fontSize="md">• {utils.calculateTimeDistance(comment.createdAt)}</Text>
      </HStack>
      <ThreadBody body={comment.content} />
      <FeedbackThread
        initialVoteStatus={voteStatus}
        onVote={setVoteStatus}
        size="xs"
        totalDislikes={comment.downVotesBy.length}
        totalLikes={comment.upVotesBy.length}
      />
      {lastComment && (
        <Text
          mt={8}
          fontSize="1rem"
          fontWeight="semibold"
          textAlign="center"
        >
          No more comments
        </Text>
      )}
    </Flex>
  );
}

ThreadComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    content: PropTypes.string,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
  }),
  lastComment: PropTypes.bool,
};

ThreadComment.defaultProps = {
  comment: {
    id: '',
    owner: {
      name: '',
      avatar: '',
    },
    content: '',
    upVotesBy: [],
    downVotesBy: [],
    createdAt: '',
  },
  lastComment: false,
};
