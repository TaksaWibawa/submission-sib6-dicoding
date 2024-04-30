import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Avatar, Text, Box } from '@chakra-ui/react';

export function LeaderboardRow({ avatar, name, score }) {
  return (
    <Flex
      bg="dark.100"
      boxShadow="base"
      p={5}
      rounded="md"
      align="center"
      justify="space-between"
      mb={4}
    >
      <Flex align="center">
        <Avatar
          src={avatar}
          name={name}
          mr={4}
        />
        <Text
          fontSize="xl"
          textTransform="capitalize"
        >
          {name}
        </Text>
      </Flex>
      <Box>
        <Text
          fontSize="xl"
          fontWeight="bold"
        >
          {score}
        </Text>
      </Box>
    </Flex>
  );
}

LeaderboardRow.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
