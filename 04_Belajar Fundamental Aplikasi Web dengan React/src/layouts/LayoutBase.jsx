import { HeaderBase } from '../components';
import PropTypes from 'prop-types';

export function LayoutBase({ children }) {
	return (
		<div className="app-container">
			<HeaderBase />
			<main>{children}</main>
		</div>
	);
}

LayoutBase.propTypes = {
	children: PropTypes.node,
};
