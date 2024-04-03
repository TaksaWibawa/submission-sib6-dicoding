import { createContext } from 'react';

export const ContextTheme = createContext({
	theme: 'light',
	toggleTheme: () => {},
});
