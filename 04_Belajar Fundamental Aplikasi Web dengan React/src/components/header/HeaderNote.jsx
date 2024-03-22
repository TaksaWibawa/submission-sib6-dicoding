import { SearchBar } from '../search-bar';
import PropTypes from 'prop-types';

export function HeaderNote({ title }) {
	return (
		<>
			<h2>{title}</h2>
			<SearchBar />
		</>
	);
}

HeaderNote.propTypes = {
	title: PropTypes.string.isRequired,
};
