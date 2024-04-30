import { useState } from 'react';

export const useInput = (initialValue) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleChange = (valueToSet) => {
    if (valueToSet.target) {
      setCurrentValue(valueToSet.target.value);
      return;
    }
    setCurrentValue(valueToSet);
  };

  const reset = () => {
    setCurrentValue(initialValue);
  };

  return [currentValue, handleChange, reset];
};
