import { useState } from 'react';
import { ContextTheme } from './ContextTheme';
import PropTypes from 'prop-types';

export const ProviderTheme = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return <ContextTheme.Provider value={{ theme, toggleTheme }}>{children}</ContextTheme.Provider>;
};

ProviderTheme.propTypes = {
	children: PropTypes.node.isRequired,
};
