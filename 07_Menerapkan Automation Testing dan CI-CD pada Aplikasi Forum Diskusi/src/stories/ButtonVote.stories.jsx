import { ButtonVote } from '@/components';
import { chakraTheme } from '@/configs';
import { store } from '@/stores';
import { Center, ChakraProvider, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaArrowUp, FaArrowDown, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Provider } from 'react-redux';

export default {
  title: 'Components/ButtonVote',
  component: ButtonVote,
};

const Template = (args) => (
  <Provider store={store}>
    <ChakraProvider theme={chakraTheme}>
      <Flex
        justifyContent="center"
        alignItems="center"
        h="90vh"
        bgColor="dark.200"
      >
        <ButtonVote {...args} />
      </Flex>
    </ChakraProvider>
  </Provider>
);

export const UpVoteActive = Template.bind({});
UpVoteActive.args = {
  isActive: true,
  onVote: () => {},
  icon: <FaThumbsUp />,
  voteType: 'up-vote',
  text: '10',
  size: 'sm',
};

export const DownVoteActive = Template.bind({});
DownVoteActive.args = {
  isActive: true,
  onVote: () => {},
  icon: <FaThumbsDown />,
  voteType: 'down-vote',
  text: '10',
  size: 'sm',
};
