import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ContextLanguage } from '../../stores';

export function CardBase({ data }) {
	const { language } = useContext(ContextLanguage);

	return (
		<article className="note-item">
			<h3 className="note-item__title">
				<Link to={`/notes/${data.id}`}>{data.title}</Link>
			</h3>
			<p className="note-item__createdAt">{showFormattedDate(data.createdAt, language)}</p>
			<p className="note-item__body">{data.body}</p>
		</article>
	);
}

CardBase.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
	}).isRequired,
};
