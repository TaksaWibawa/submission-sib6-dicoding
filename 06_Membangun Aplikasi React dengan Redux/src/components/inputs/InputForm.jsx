import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { utils } from '@/utils';

export function InputForm({ name, type, placeholder, value, setValue, error, ...props }) {
  return (
    <FormControl isInvalid={error}>
      <FormLabel color={error ? 'red.500' : 'secondary-light'}>{utils.capitalize(name)}</FormLabel>
      <Input
        name={name}
        type={type}
        placeholder={utils.capitalize(placeholder)}
        value={value}
        onChange={setValue}
        borderColor={error ? 'red.500' : 'secondary-dark'}
        _placeholder={{ color: error ? 'red.500' : 'secondary-dark' }}
        {...props}
      />
    </FormControl>
  );
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

InputForm.defaultProps = {
  error: false,
};
