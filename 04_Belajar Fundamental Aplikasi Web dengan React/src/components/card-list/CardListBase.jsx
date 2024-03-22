import PropTypes from 'prop-types';
import { CardBase } from '../card/CardBase';
import { filterByKeyword } from '../../utils';
import { useLocation, useSearchParams } from 'react-router-dom';

export function CardListBase({ items }) {
	const [searchParams] = useSearchParams();
	const emptyText = useLocation().pathname === '/archives' ? 'Arsip kosong' : 'Tidak ada catatan';

	const keyword = searchParams.get('keyword') || '';
	const filteredItems = filterByKeyword(items, keyword);

	return (
		<section className={`notes-list${filteredItems.length === 0 ? '-empty' : ''}`}>
			{filteredItems.length === 0 ? (
				<p className="notes-list__empty">{emptyText}</p>
			) : (
				filteredItems.map((item) => (
					<CardBase
						key={item.id}
						data={item}
					/>
				))
			)}
		</section>
	);
}

CardListBase.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			body: PropTypes.string,
			createdAt: PropTypes.string,
			archived: PropTypes.bool,
		})
	),
};
