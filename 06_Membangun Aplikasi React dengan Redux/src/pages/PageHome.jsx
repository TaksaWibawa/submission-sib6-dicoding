import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
  filterThreads,
  getThreads,
  threadsSelector,
  resetThreads,
  usersSelector,
  tagsSelector,
  setSelectedTag,
  resetTags,
  authSelector,
} from '@/stores/slices';
import { LayoutPage } from '@/layouts';
import { CardTagsHorizontal, CreateThreadButton, PopularTags, ThreadList } from '@/components';
import { useMediaQuery } from '@chakra-ui/react';

export function PageHome() {
  const dispatch = useDispatch();
  const { filteredData: filteredThreads, status } = useSelector(threadsSelector);
  const { data: users } = useSelector(usersSelector);
  const { tags, selectedTag } = useSelector(tagsSelector);
  const { currentUser } = useSelector(authSelector);
  const [isLargerThanSmallLaptop] = useMediaQuery('(min-width: 1025px)');

  const findUserById = (id) => users.find((user) => user.id === id);

  const threads = filteredThreads.map((thread) => ({
    ...thread,
    threadInfo: {
      totalLikes: thread.upVotesBy?.length,
      totalDislikes: thread.downVotesBy?.length,
      totalComments: thread?.totalComments,
      createdAt: formatDistanceToNow(new Date(thread?.createdAt), { addSuffix: true }),
      author: findUserById(thread?.ownerId)?.name,
    },
  }));

  const handleFilterTag = (tag) => {
    const newTag = tag === selectedTag ? '' : tag;
    dispatch(setSelectedTag(newTag));
    dispatch(filterThreads(newTag));
  };

  useEffect(() => {
    dispatch(getThreads());
    return () => {
      dispatch(resetThreads());
      dispatch(resetTags());
    };
  }, [dispatch]);

  return (
    <LayoutPage status={status}>
      {!isLargerThanSmallLaptop && (
        <CardTagsHorizontal
          tags={tags}
          handleFilterTag={handleFilterTag}
        />
      )}
      <ThreadList threads={threads} />
      {isLargerThanSmallLaptop && (
        <PopularTags
          tags={tags}
          handleFilterTag={handleFilterTag}
        />
      )}
      {currentUser && <CreateThreadButton />}
    </LayoutPage>
  );
}
