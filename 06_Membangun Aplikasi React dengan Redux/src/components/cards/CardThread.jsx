import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useVote } from '@/hooks';
import { TagThread } from '../tags';
import { FeedbackThread } from '../actions';

export function CardThread({ id, title, body, category, threadInfo, upVotesBy, downVotesBy }) {
  const { voteStatus, setVoteStatus } = useVote(upVotesBy, downVotesBy, id);

  const infoArray = [
    `${threadInfo.totalComments} Comments`,
    threadInfo.createdAt,
    threadInfo.author,
  ];

  return (
    <Card
      orientation="horizontal"
      padding="1rem"
      borderRadius="md"
      bg="dark.200"
      overflow="hidden"
      h="15rem"
    >
      <CardHeader
        fontSize="1.5rem"
        fontWeight="semibold"
        color="secondary-light"
        overflowX="hidden"
        py={1}
      >
        <Flex pb={2}>
          <TagThread
            text={category}
            size="sm"
          />
        </Flex>
        <Heading
          as={Link}
          to={`/thread/${id}`}
          w="fit-content"
          size={{ base: 'md', lg: 'lg' }}
          mt={2}
          lineHeight={1.5}
          fontWeight="bold"
          color="secondary-light"
          isTruncated
          _hover={{
            textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {title}
        </Heading>
      </CardHeader>
      <CardBody pt={1}>
        <Text
          as={TextTruncate}
          fontSize={{ base: 'sm', lg: 'md' }}
          color="secondary-light"
          line={2}
          truncateText="…"
          text={body}
        />
      </CardBody>
      <CardFooter py={1}>
        <Flex
          justify="space-between"
          align="center"
          width="100%"
        >
          <FeedbackThread
            totalLikes={threadInfo.totalLikes}
            totalDislikes={threadInfo.totalDislikes}
            initialVoteStatus={voteStatus}
            onVote={setVoteStatus}
          />
          <HStack spacing={2}>
            {infoArray.map((info, index) => (
              <React.Fragment key={info}>
                <Text
                  fontSize="sm"
                  color="secondary-light"
                >
                  {info}
                </Text>
                {index < infoArray.length - 1 && (
                  <Text
                    fontSize="sm"
                    color="secondary-light"
                  >
                    •
                  </Text>
                )}
              </React.Fragment>
            ))}
          </HStack>
        </Flex>
      </CardFooter>
    </Card>
  );
}

CardThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  threadInfo: PropTypes.shape({
    totalLikes: PropTypes.number,
    totalDislikes: PropTypes.number,
    totalComments: PropTypes.number,
    createdAt: PropTypes.string,
    author: PropTypes.string,
  }),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CardThread.defaultProps = {
  threadInfo: {
    totalLikes: 0,
    totalDislikes: 0,
    totalComments: 0,
    createdAt: '',
    author: '',
  },
};
