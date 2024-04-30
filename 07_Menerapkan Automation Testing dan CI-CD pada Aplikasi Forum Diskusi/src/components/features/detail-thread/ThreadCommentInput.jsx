import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Avatar } from '@chakra-ui/react';
import { ButtonFilled } from '@/components/buttons';
import {
  createComment,
  createCommentSelector,
  getDetailThread,
  resetCreateComment,
} from '@/stores/slices';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '@/hooks';
import { useParams } from 'react-router-dom';
import { InputHTML } from '@/components/inputs';

export function ThreadCommentInput({ name, avatar }) {
  const threadId = useParams().id;
  const dispatch = useDispatch();
  const { status } = useSelector(createCommentSelector);
  const [content, setContent, resetContent] = useInput('');

  const handleSubmit = () => {
    dispatch(createComment({ threadId, content })).then((response) => {
      if (createComment.fulfilled.match(response)) {
        dispatch(getDetailThread(threadId));
        dispatch(resetCreateComment());
        resetContent();
      }
    });
  };

  return (
    <Flex gap={2}>
      <Avatar
        name={name}
        src={avatar}
        size="lg"
      />
      <Flex
        flexDirection="column"
        width="calc(100% - 70px)"
        gap={2}
      >
        <InputHTML
          name="content"
          placeholder="Write a comment..."
          onInput={setContent}
        />
        <ButtonFilled
          onClick={handleSubmit}
          text="Post"
          padding="1rem"
          isLoading={status === 'loading'}
        />
      </Flex>
    </Flex>
  );
}

ThreadCommentInput.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
};

ThreadCommentInput.defaultProps = {
  name: '',
  avatar: '',
};
