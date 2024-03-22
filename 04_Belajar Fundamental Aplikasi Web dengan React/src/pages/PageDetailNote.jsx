import { archiveNote, unarchiveNote, deleteNote, getNote } from '../utils/local-data';
import { ButtonBase } from '../components/button';
import { IconArchive, IconDelete, IconEdit, IconUnarchive } from '../components/icons';
import { showFormattedDate } from '../utils';
import { useParams } from 'react-router-dom';

export function PageDetailNote() {
	const id = useParams().id;
	const note = getNote(id);

	const handleArchive = () => {
		note.archived ? unarchiveNote(id) : archiveNote(id);
	};

	const handleDelete = () => {
		deleteNote(id);
	};

	return (
		<section className="detail-page">
			<h3 className="detail-page__title">{note.title}</h3>
			<p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
			<p className="detail-page__body">{note.body}</p>
			<aside className="detail-page__action">
				<ButtonBase
					path={'/'}
					name={note.archived ? 'Aktifkan' : 'Arsipkan'}
					icon={note.archived ? <IconUnarchive /> : <IconArchive />}
					onClick={handleArchive}
				/>
				<ButtonBase
					path={`/notes/${id}/edit`}
					name={'Edit'}
					icon={<IconEdit />}
				/>
				<ButtonBase
					path={'/'}
					name={'Hapus'}
					icon={<IconDelete />}
					onClick={handleDelete}
				/>
			</aside>
		</section>
	);
}
