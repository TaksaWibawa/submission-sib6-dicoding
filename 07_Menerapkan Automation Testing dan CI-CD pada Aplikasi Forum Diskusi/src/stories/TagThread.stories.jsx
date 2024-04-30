import { TagThread } from '@/components';
import { chakraTheme } from '@/configs';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import React from 'react';

export default {
  title: 'Components/TagThread',
  component: TagThread,
};

const Template = (args) => (
  <ChakraProvider theme={chakraTheme}>
    <Flex
      justifyContent="center"
      alignItems="center"
      h="90vh"
      bgColor="dark.200"
    >
      <TagThread {...args} />
    </Flex>
  </ChakraProvider>
);

export const Small = Template.bind({});
Small.args = {
  text: 'small tag',
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  text: 'medium tag',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  text: 'large tag',
  size: 'lg',
};
