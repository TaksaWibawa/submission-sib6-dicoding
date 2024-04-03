import { createContext } from 'react';

export const ContextAction = createContext({
	actionPerformed: '',
	setActionPerformed: () => {},
});
