import React, { useEffect } from 'react';
import { utils } from '@/utils';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadHeader } from '@/components';
import { ThreadExtraInfo } from '@/components/features/detail-thread/ThreadExtraInfo';
import { ThreadCommentList } from '@/components/features/detail-thread/ThreadCommentList';
import { ThreadCommentInput } from '@/components/features/detail-thread/ThreadCommentInput';
import { ThreadBody } from '@/components/features/detail-thread/ThreadBody';
import { LayoutPage } from '@/layouts';
import { Divider, Flex, GridItem, Text } from '@chakra-ui/react';
import { authSelector, detailThreadSelector, getDetailThread } from '@/stores/slices';
import { PageResponse } from './PageResponse';

export function PageDetailThread() {
  const threadId = useParams().id;
  const dispatch = useDispatch();
  const { status, data } = useSelector(detailThreadSelector);
  const { currentUser } = useSelector(authSelector);

  const threadInfo = {
    upVotesBy: data?.upVotesBy,
    downVotesBy: data?.downVotesBy,
    totalLikes: data?.upVotesBy?.length,
    totalDislikes: data?.downVotesBy?.length,
    createdAt: data?.createdAt && utils.calculateTimeDistance(data.createdAt),
    author: data?.owner?.name,
    avatar: data?.owner?.avatar,
  };

  useEffect(() => {
    dispatch(getDetailThread(threadId));
  }, [dispatch, threadId]);

  if (status === 'error') {
    return <PageResponse statusCode={404} />;
  }

  return (
    <LayoutPage status={status}>
      <GridItem
        as="section"
        colSpan={2}
        display="flex"
        flexDirection="column"
        gap={4}
        maxW="100%"
        mx="20%"
      >
        <ThreadHeader
          title={data?.title}
          category={data?.category}
        />
        <ThreadBody body={data?.body} />
        <ThreadExtraInfo threadInfo={threadInfo} />

        <Text mt={6}>{data?.comments?.length} Comments</Text>
        <Divider />

        <Flex
          flexDirection="column"
          gap={8}
        >
          {currentUser && (
            <ThreadCommentInput
              name={currentUser?.name}
              avatar={currentUser?.avatar}
            />
          )}
          {!currentUser && (
            <Text
              fontSize="lg"
              textAlign="center"
            >
              Please{' '}
              <Link to="/login">
                <Text
                  as="span"
                  color="blue.400"
                  fontWeight="bold"
                  _hover={{ textDecoration: 'underline' }}
                >
                  login
                </Text>{' '}
              </Link>
              to comment.
            </Text>
          )}
          <ThreadCommentList comments={data?.comments} />
        </Flex>
      </GridItem>
    </LayoutPage>
  );
}
