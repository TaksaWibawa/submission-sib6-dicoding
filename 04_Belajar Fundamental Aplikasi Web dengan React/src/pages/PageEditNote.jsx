import { ButtonBase, IconSave } from '../components';
import { editNote, getNote } from '../utils/local-data';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export function PageEditNote() {
	const id = useParams().id;
	const note = getNote(id);

	const [title, setTitle] = useState(note?.title);
	const [body, setBody] = useState(note?.body);

	const handleEdit = () => {
		editNote({
			id: id,
			title: title || '(untitled)',
			body: body || '(empty note)',
		});
	};

	return (
		<section className="add-new-page">
			<div className="add-new-page__input">
				<input
					className="add-new-page__input__title"
					type="text"
					placeholder="Catatan Rahasia"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className="add-new-page__input__body"
					placeholder="Sebenarnya saya adalah ...."
					value={body}
					onInput={(e) => setBody(e.target.value)}
				></textarea>
			</div>
			<div className="add-new-page__action">
				<ButtonBase
					path={'/'}
					name={'Simpan'}
					icon={<IconSave />}
					onClick={handleEdit}
				/>
			</div>
		</section>
	);
}
