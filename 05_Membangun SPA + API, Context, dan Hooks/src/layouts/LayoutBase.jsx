import { ContextTheme } from '../stores';
import { HeaderBase } from '../components';
import { useContext } from 'react';
import PropTypes from 'prop-types';

export function LayoutBase({ children }) {
	const { theme } = useContext(ContextTheme);

	return (
		<div
			className="app-container"
			data-theme={theme}
		>
			<HeaderBase />
			<main>{children}</main>
		</div>
	);
}

LayoutBase.propTypes = {
	children: PropTypes.node,
};
