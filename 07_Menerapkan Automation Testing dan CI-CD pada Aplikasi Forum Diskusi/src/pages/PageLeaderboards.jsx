import { LeaderboardRow } from '@/components';
import { LayoutPage } from '@/layouts';
import {
  getLeaderboards,
  getLeaderboardsSelector,
  resetLeaderboards,
} from '@/stores/slices/leaderboards';
import { Flex, GridItem, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function PageLeaderboards() {
  const dispatch = useDispatch();
  const { status, data } = useSelector(getLeaderboardsSelector);

  useEffect(() => {
    dispatch(getLeaderboards());
    return () => {
      dispatch(resetLeaderboards());
    };
  }, [dispatch]);

  return (
    <LayoutPage status={status}>
      <GridItem
        colSpan={3}
        paddingY={6}
        paddingX={{ base: 2, lg: 40 }}
      >
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={2}
        >
          Leaderboards
        </Heading>
        <Text
          textAlign="center"
          mb={6}
        >
          Here are the top 10 users with the most points.
        </Text>
        <Flex
          justify="space-between"
          px={4}
          mb={4}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
          >
            User
          </Text>
          <Text
            fontSize="lg"
            fontWeight="bold"
          >
            Scores
          </Text>
        </Flex>
        {data.map((item) => (
          <LeaderboardRow
            key={item.user.id}
            avatar={item.user.avatar}
            name={item.user.name}
            score={item.score}
          />
        ))}
      </GridItem>
    </LayoutPage>
  );
}
