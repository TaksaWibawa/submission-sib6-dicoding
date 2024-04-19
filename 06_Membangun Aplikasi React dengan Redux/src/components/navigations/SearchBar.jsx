import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export function SearchBar({ onSearch, value }) {
  return (
    <InputGroup
      size="md"
      width="100%"
      bgColor="dark.200"
      color="secondary"
      borderRadius="full"
    >
      <InputRightElement>
        <FaSearch />
      </InputRightElement>
      <Input
        name="search"
        onChange={onSearch}
        value={value}
        borderColor={0}
        placeholder="Search by tag..."
        border="none"
        focusBorderColor="secondary"
        _placeholder={{
          color: 'secondary',
        }}
      />
    </InputGroup>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SearchBar.defaultProps = {
  value: '',
};
