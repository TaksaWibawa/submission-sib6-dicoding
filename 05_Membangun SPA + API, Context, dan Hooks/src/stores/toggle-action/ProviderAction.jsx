import { useState } from 'react';
import { ContextAction } from './ContextAction';
import PropTypes from 'prop-types';

export const ProviderAction = ({ children }) => {
	const [actionPerformed, setActionPerformed] = useState('');

	return <ContextAction.Provider value={{ actionPerformed, setActionPerformed }}>{children}</ContextAction.Provider>;
};

ProviderAction.propTypes = {
	children: PropTypes.node.isRequired,
};
