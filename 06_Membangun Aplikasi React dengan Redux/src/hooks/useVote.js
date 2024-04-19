import { authSelector, setVoteComment, setVoteThread } from '@/stores/slices';
import { useSelector, useDispatch } from 'react-redux';

export function useVote(upVotesBy, downVotesBy, threadId, commentId = null) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);

  const upVotesSet = new Set(upVotesBy);
  const downVotesSet = new Set(downVotesBy);

  let voteStatus = '';
  if (upVotesSet.has(currentUser?.id)) {
    voteStatus = 'up-vote';
  } else if (downVotesSet.has(currentUser?.id)) {
    voteStatus = 'down-vote';
  }

  const setVoteStatus = (type) => {
    if (commentId) {
      dispatch(setVoteComment({ threadId, commentId, vote: type }));
    } else {
      dispatch(setVoteThread({ threadId, vote: type }));
    }
  };

  return { voteStatus, setVoteStatus };
}
