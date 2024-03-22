import { IconAdd, ButtonBase, CardListBase, HeaderNote } from '../components';
import { getActiveNotes } from '../utils/local-data';

export function PageHome() {
	const activeNotes = getActiveNotes();

	return (
		<section className="homepage">
			<HeaderNote title={'Catatan Aktif'} />
			<CardListBase items={activeNotes} />
			<aside className="homepage__action">
				<ButtonBase
					path={'/notes/new'}
					name={'Tambah'}
					icon={<IconAdd />}
				/>
			</aside>
		</section>
	);
}
