import { archiveNote, unarchiveNote, deleteNote, getNote } from '../utils/network-data';
import { ButtonBase } from '../components/button';
import { ContextAction, ContextLanguage } from '../stores';
import { IconArchive, IconDelete, IconUnarchive } from '../components/icons';
import { LoaderBase } from '../components';
import { showFormattedDate } from '../utils';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LANG_DETAIL = {
	id: {
		archive: 'Arsipkan',
		unarchive: 'Aktifkan',
		delete: 'Hapus',
	},
	en: {
		archive: 'Archive',
		unarchive: 'Unarchive',
		delete: 'Delete',
	},
};

export function PageDetailNote() {
	const id = useParams().id;

	const { setActionPerformed } = useContext(ContextAction);
	const { language } = useContext(ContextLanguage);

	const [note, setNote] = useState({});
	const [loadingDetailNote, setLoadingDetailNote] = useState(false);

	const fetchDetailNote = async () => {
		setLoadingDetailNote(true);
		const response = await getNote(id);
		if (response.error) return;
		setNote(response.data);
		setLoadingDetailNote(false);
	};

	const handleArchive = async () => {
		setActionPerformed(true);
		note.archived ? await unarchiveNote(id) : await archiveNote(id);
	};

	const handleDelete = async () => {
		setActionPerformed(true);
		await deleteNote(id);
	};

	useEffect(() => {
		fetchDetailNote();
	}, []);

	return (
		<section className="detail-page">
			{loadingDetailNote ? (
				<LoaderBase />
			) : (
				<>
					<h3 className="detail-page__title">{note.title}</h3>
					<p className="detail-page__createdAt">{showFormattedDate(note.createdAt, language)}</p>
					<p className="detail-page__body">{note.body}</p>
					<aside className="detail-page__action">
						<ButtonBase
							path={'/'}
							name={note.archived ? LANG_DETAIL[language].unarchive : LANG_DETAIL[language].archive}
							icon={note.archived ? <IconUnarchive /> : <IconArchive />}
							onClick={handleArchive}
						/>
						<ButtonBase
							path={'/'}
							name={LANG_DETAIL[language].delete}
							icon={<IconDelete />}
							onClick={handleDelete}
						/>
					</aside>
				</>
			)}
		</section>
	);
}
