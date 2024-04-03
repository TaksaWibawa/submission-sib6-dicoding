import { useState } from 'react';
import { ContextLanguage } from './ContextLanguage';
import PropTypes from 'prop-types';

export const ProviderLanguage = ({ children }) => {
	const [language, setLanguage] = useState(localStorage.getItem('language') || 'id');

	const toggleLanguage = () => {
		const newLanguage = language === 'id' ? 'en' : 'id';
		setLanguage(newLanguage);
		localStorage.setItem('language', newLanguage);
	};

	return <ContextLanguage.Provider value={{ language, toggleLanguage }}>{children}</ContextLanguage.Provider>;
};

ProviderLanguage.propTypes = {
	children: PropTypes.node.isRequired,
};
