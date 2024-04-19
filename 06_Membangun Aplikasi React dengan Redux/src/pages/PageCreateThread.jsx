import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutPage } from '@/layouts';
import { Flex, GridItem, Heading, Text } from '@chakra-ui/react';
import { createThread, createThreadSelector, resetCreateThread } from '@/stores/slices';
import { ButtonFilled, InputForm, InputHTML } from '@/components';

export function PageCreateThread() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(createThreadSelector);

  const [title, setTitle, resetTitle] = useInput('');
  const [body, setBody, resetBody] = useInput('');
  const [category, setCategory, resetCategory] = useInput('');
  const [error, setError] = useState(false);

  const resetForm = () => {
    resetTitle();
    resetBody();
    resetCategory();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('body', body);
    data.append('category', category);

    const isValid = title || body || category;
    if (!isValid) {
      setError(true);
    }

    const resultAction = await dispatch(createThread(data));

    if (createThread.fulfilled.match(resultAction)) {
      resetForm();
      navigate('/');
    } else {
      setError(true);
    }
  };

  useEffect(
    () => () => {
      dispatch(resetCreateThread());
    },
    [dispatch]
  );

  return (
    <LayoutPage>
      <GridItem
        colSpan={2}
        paddingY="calc(2 * 10px)"
        paddingX={40}
      >
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          pb={2}
        >
          Create New Thread
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection="column"
            gap={4}
            width="100%"
          >
            <InputForm
              value={title}
              type="text"
              setValue={setTitle}
              placeholder="Add a title"
              name="title"
              label="Title"
              error={error}
            />
            <InputForm
              value={category}
              type="text"
              setValue={setCategory}
              placeholder="Add a category"
              name="category"
              label="Category"
              error={error}
            />

            <Flex
              flexDirection="column"
              gap={2}
              width="100%"
            >
              <Text color={error ? 'red.500' : 'secondary-light'}>Content</Text>
              <InputHTML
                name="body"
                onInput={setBody}
                placeholder="Add your content"
                error={error}
              />
            </Flex>

            <ButtonFilled
              text="Create"
              type="submit"
              isLoading={status === 'loading'}
            />
          </Flex>
        </form>
      </GridItem>
    </LayoutPage>
  );
}
