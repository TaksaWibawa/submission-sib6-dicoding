import { useState } from 'react';
import { ButtonBase, IconSave } from '../components';
import { addNote } from '../utils/local-data';

export function PageAddNote() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSave = () => {
		const newNote = {
			id: `note-${+new Date()}`,
			title: title || '(untitled)',
			body: body || '(empty note)',
			archived: false,
			createdAt: new Date().toISOString(),
		};

		addNote(newNote);
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
					onClick={handleSave}
				/>
			</div>
		</section>
	);
}
