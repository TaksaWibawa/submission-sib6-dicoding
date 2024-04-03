import { CardListBase, HeaderNote, LoaderBase } from '../components';
import { ContextAction, ContextLanguage } from '../stores';
import { getArchivedNotes } from '../utils/network-data';
import { useContext, useEffect, useState } from 'react';

const LANG_ARCHIVE = {
	id: {
		title: 'Catatan Arsip',
	},
	en: {
		title: 'Archived Notes',
	},
};

export function PageArchive() {
	const { language } = useContext(ContextLanguage);
	const { actionPerformed, setActionPerformed } = useContext(ContextAction);

	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchArchivedNotes = async () => {
		setLoading(true);
		const response = await getArchivedNotes();
		if (response.error) return;
		setNotes(response.data);
		setLoading(false);
	};

	useEffect(() => {
		if (actionPerformed) {
			fetchArchivedNotes();
			setActionPerformed(false);
		}
	}, [actionPerformed]);

	useEffect(() => {
		fetchArchivedNotes();
	}, []);

	return (
		<section className="archives-page">
			<HeaderNote title={LANG_ARCHIVE[language].title} />
			{loading ? <LoaderBase /> : <CardListBase items={notes} />}
		</section>
	);
}
