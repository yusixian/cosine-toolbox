import { useState } from 'react';
import { useThrottle } from './useThrottle';

export const useInput = (initialValue?: any) => {
  const [inputValue, setInputValue] = useState(initialValue ?? '');
  const onInputChange = useThrottle((e: any) => setInputValue(e.target.value), 50);
  return { inputValue, setInputValue, onInputChange };
};
