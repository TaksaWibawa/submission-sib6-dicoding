import PropTypes from 'prop-types';
import { capitalizeSentence } from '../../utils';

export function InputBase({ type, name, placeholder, value, onChange, ...props }) {
	return (
		<>
			<label htmlFor={name}>{capitalizeSentence(name)}</label>
			<input
				type={type}
				name={name}
				id={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</>
	);
}

InputBase.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
