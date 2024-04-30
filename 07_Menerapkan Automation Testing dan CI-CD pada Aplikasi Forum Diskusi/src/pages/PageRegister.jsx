import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, GridItem, Heading, Text } from '@chakra-ui/react';
import { useInput } from '@/hooks';
import { LayoutPage } from '@/layouts';
import { ButtonFilled, InputForm } from '@/components';
import { authSelector, register, resetStatusAuth } from '@/stores/slices';

export function PageRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(authSelector);

  const [name, setName, resetName] = useInput('');
  const [email, setEmail, resetEmail] = useInput('');
  const [password, setPassword, resetPassword] = useInput('');
  const [error, setError] = useState(false);

  const resetForm = () => {
    resetName();
    resetEmail();
    resetPassword();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const isValid = data.get('name') || data.get('email') || data.get('password');
    if (!isValid) {
      setError(true);
    }

    const resultAction = await dispatch(register(data));

    if (register.fulfilled.match(resultAction)) {
      resetForm();
      navigate('/login');
    } else {
      setError(true);
    }
  };

  useEffect(
    () => () => {
      dispatch(resetStatusAuth());
    },
    [dispatch]
  );

  return (
    <LayoutPage>
      <GridItem
        colSpan={3}
        paddingY={6}
      >
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={4}
        >
          Register
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection="column"
            gap={4}
            width="100%"
            paddingX="25%"
          >
            <InputForm
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              setValue={setName}
              error={error}
              isDisabled={status === 'loading'}
            />
            <InputForm
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={error}
              isDisabled={status === 'loading'}
            />
            <InputForm
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={error}
              isDisabled={status === 'loading'}
            />

            <ButtonFilled
              text="Register"
              type="submit"
              isLoading={status === 'loading'}
            />
          </Flex>
        </form>
        <Text
          textAlign="center"
          mt={4}
          color="secondary-light"
        >
          Already have an account?&nbsp;
          <Text
            as="span"
            cursor="pointer"
            onClick={() => navigate('/login')}
            _hover={{
              color: 'secondary-dark',
              textDecoration: 'underline',
            }}
          >
            Login
          </Text>
        </Text>
      </GridItem>
    </LayoutPage>
  );
}
