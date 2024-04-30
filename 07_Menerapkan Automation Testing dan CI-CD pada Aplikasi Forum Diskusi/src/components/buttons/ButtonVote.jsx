import React from 'react';
import PropTypes from 'prop-types';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export function ButtonVote({ isActive, onVote, icon, voteType, text, size }) {
  const handleClick = () => {
    onVote(voteType);
  };

  const hoverBgColor = voteType === 'up-vote' ? 'green.500' : 'red.500';

  return (
    <Flex
      alignItems="center"
      gap={1}
    >
      <IconButton
        name={String(voteType)}
        variant="outline"
        size={size}
        onClick={handleClick}
        isRound
        isActive={isActive}
        icon={icon}
        color="secondary-light"
        bgColor="dark.100"
        aria-label={String(text)}
        _active={{ bg: hoverBgColor, color: 'white' }}
        _hover={{ bg: hoverBgColor, color: 'white' }}
      />
      <Text
        fontSize="sm"
        color="secondary-light"
      >
        {String(text)}
      </Text>
    </Flex>
  );
}

ButtonVote.propTypes = {
  isActive: PropTypes.bool,
  onVote: PropTypes.func,
  icon: PropTypes.node,
  voteType: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
};

ButtonVote.defaultProps = {
  isActive: false,
  onVote: () => {},
  icon: null,
  voteType: '',
  text: '',
  size: 'sm',
};
