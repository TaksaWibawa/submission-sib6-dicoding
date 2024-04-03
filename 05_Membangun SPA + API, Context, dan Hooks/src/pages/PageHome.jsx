import { ContextAction, ContextLanguage } from '../stores';
import { getActiveNotes } from '../utils/network-data';
import { IconAdd, ButtonBase, CardListBase, HeaderNote, LoaderBase } from '../components';
import { useContext, useEffect, useState } from 'react';

const LANG_HOME = {
	id: {
		title: 'Catatan Aktif',
		addLabel: 'Tambah',
	},
	en: {
		title: 'Active Notes',
		addLabel: 'Add',
	},
};

export function PageHome() {
	const { language } = useContext(ContextLanguage);
	const { actionPerformed, setActionPerformed } = useContext(ContextAction);

	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchActiveNotes = async () => {
		setLoading(true);
		const response = await getActiveNotes();
		if (response.error) return;
		setNotes(response.data);
		setLoading(false);
	};

	useEffect(() => {
		if (actionPerformed) {
			fetchActiveNotes();
			setActionPerformed(false);
		}
	}, [actionPerformed]);

	useEffect(() => {
		fetchActiveNotes();
	}, []);

	return (
		<section className="homepage">
			<HeaderNote title={LANG_HOME[language].title} />
			{loading ? <LoaderBase /> : <CardListBase items={notes} />}
			<aside className="homepage__action">
				<ButtonBase
					path={'/notes/new'}
					name={LANG_HOME[language].addLabel}
					icon={<IconAdd />}
				/>
			</aside>
		</section>
	);
}
