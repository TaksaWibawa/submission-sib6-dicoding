import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, Button, useToast, Flex } from '@chakra-ui/react';
import { Toast } from '@/components';
import { store } from '@/stores';
import { chakraTheme } from '@/configs';

export default {
  title: 'Components/Toast',
  component: Toast,
};

const Template = (args) => {
  const toast = useToast();
  return (
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme}>
        <Toast {...args} />
        <Flex
          justifyContent="center"
          alignItems="center"
          h="90vh"
          bgColor="dark.200"
        >
          <Button
            onClick={() =>
              toast({
                title: args.title,
                description: args.description,
                status: args.status,
                duration: 3000,
                isClosable: true,
              })
            }
          >
            Show Toast
          </Button>
        </Flex>
      </ChakraProvider>
    </Provider>
  );
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success',
  description: 'This is a success toast',
  status: 'success',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Error',
  description: 'This is an error toast',
  status: 'error',
};
