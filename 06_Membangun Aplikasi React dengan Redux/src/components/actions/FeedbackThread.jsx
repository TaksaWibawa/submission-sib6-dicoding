import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { HStack } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { authSelector } from '@/stores/slices';
import { ButtonVote } from '../buttons';

export function FeedbackThread({ totalLikes, totalDislikes, size, initialVoteStatus, onVote }) {
  const { currentUser } = useSelector(authSelector);

  const [upVotes, setUpVotes] = useState(totalLikes);
  const [downVotes, setDownVotes] = useState(totalDislikes);
  const [voteStatus, setVoteStatus] = useState(initialVoteStatus);

  const doVote = (type) => {
    onVote(type);
    setVoteStatus(type);
  };

  const handleVote = (type) => {
    const isNeutralVote = voteStatus === type;
    const isUpvote = type === 'up-vote';
    const isDownvote = type === 'down-vote';

    if (isNeutralVote) {
      doVote('neutral-vote');
      if (currentUser) {
        if (isUpvote) {
          setUpVotes(upVotes - 1);
        } else {
          setDownVotes(downVotes - 1);
        }
      }
      return;
    }

    if (isUpvote) {
      doVote('up-vote');
      if (currentUser) {
        if (voteStatus === 'down-vote') setDownVotes(downVotes - 1);
        setUpVotes(upVotes + 1);
      }
      return;
    }

    if (isDownvote) {
      doVote('down-vote');
      if (currentUser) {
        if (voteStatus === 'up-vote') setUpVotes(upVotes - 1);
        setDownVotes(downVotes + 1);
      }
    }
  };

  return (
    <HStack spacing={4}>
      <ButtonVote
        icon={<FaThumbsUp />}
        text={upVotes}
        size={size}
        isActive={voteStatus === 'up-vote'}
        onVote={handleVote}
        voteType="up-vote"
      />
      <ButtonVote
        icon={<FaThumbsDown />}
        text={downVotes}
        size={size}
        isActive={voteStatus === 'down-vote'}
        onVote={handleVote}
        voteType="down-vote"
      />
    </HStack>
  );
}

FeedbackThread.propTypes = {
  totalLikes: PropTypes.number,
  totalDislikes: PropTypes.number,
  size: PropTypes.string,
  initialVoteStatus: PropTypes.string,
  onVote: PropTypes.func,
};

FeedbackThread.defaultProps = {
  totalLikes: 0,
  totalDislikes: 0,
  size: 'sm',
  initialVoteStatus: '',
  onVote: () => {},
};
