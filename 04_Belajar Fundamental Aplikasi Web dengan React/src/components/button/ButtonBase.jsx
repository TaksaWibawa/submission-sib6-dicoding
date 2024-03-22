import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ButtonBase({ path, name, icon, onClick }) {
	return (
		<Link
			to={path}
			className="action"
			type="button"
			title={name}
			onClick={onClick}
		>
			{icon}
		</Link>
	);
}

ButtonBase.propTypes = {
	path: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	onClick: PropTypes.func,
};
