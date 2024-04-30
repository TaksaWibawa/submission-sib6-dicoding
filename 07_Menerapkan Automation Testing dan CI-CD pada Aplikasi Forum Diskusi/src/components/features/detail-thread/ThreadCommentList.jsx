import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';
import { ThreadComment } from './ThreadComment';

export function ThreadCommentList({ comments }) {
  return (
    <>
      {comments?.map((comment, index) => (
        <ThreadComment
          key={comment.id}
          comment={comment}
          lastComment={index === comments.length - 1}
        />
      ))}
      {comments?.length === 0 && (
        <Text
          mt={8}
          fontSize="1rem"
          fontWeight="semibold"
          textAlign="center"
        >
          Be the first to comment
        </Text>
      )}
    </>
  );
}

ThreadCommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      owner: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      content: PropTypes.string,
      upVotesBy: PropTypes.arrayOf(PropTypes.string),
      downVotesBy: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.string,
    })
  ),
};

ThreadCommentList.defaultProps = {
  comments: [],
};
