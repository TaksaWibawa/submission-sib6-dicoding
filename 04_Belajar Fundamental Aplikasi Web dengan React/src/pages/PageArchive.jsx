import { CardListBase, HeaderNote } from '../components';
import { getArchivedNotes } from '../utils/local-data';

export function PageArchive() {
	const archiveNotes = getArchivedNotes();

	return (
		<section className="archives-page">
			<HeaderNote title={'Catatan Arsip'} />
			<CardListBase items={archiveNotes} />
		</section>
	);
}
