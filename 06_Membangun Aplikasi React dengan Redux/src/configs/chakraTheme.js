import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
  colors: {
    'dark.100': '#262D34',
    'dark.200': '#2C353D',
    'dark.300': '#1E252B',
    brand: '#FF6934',
    secondary: '#858EAD',
    'secondary-light': '#F7F7F7',
    'secondary-dark': '#97989D',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});
