import { addNote } from '../utils/network-data';
import { ButtonBase, IconSave } from '../components';
import { ContextAction, ContextLanguage } from '../stores';
import { useContext, useState } from 'react';

const LANG_ADD = {
	id: {
		placeholderTitle: 'Catatan Rahasia',
		placeholderBody: 'Sebenarnya saya adalah ...',
		save: 'Simpan',
	},
	en: {
		placeholderTitle: 'Secret Note',
		placeholderBody: 'Actually I am ...',
		save: 'Save',
	},
};

export function PageAddNote() {
	const { language } = useContext(ContextLanguage);
	const { setActionPerformed } = useContext(ContextAction);

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSave = async () => {
		const newNote = {
			id: `note-${+new Date()}`,
			title: title || '(untitled)',
			body: body || '(empty note)',
			archived: false,
			createdAt: new Date().toISOString(),
		};

		setActionPerformed(true);
		await addNote(newNote);
	};

	return (
		<section className="add-new-page">
			<div className="add-new-page__input">
				<input
					className="add-new-page__input__title"
					type="text"
					placeholder={LANG_ADD[language].placeholderTitle}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className="add-new-page__input__body"
					placeholder={LANG_ADD[language].placeholderBody}
					value={body}
					onInput={(e) => setBody(e.target.value)}
				></textarea>
			</div>
			<div className="add-new-page__action">
				<ButtonBase
					path={'/'}
					name={LANG_ADD[language].save}
					icon={<IconSave />}
					onClick={handleSave}
				/>
			</div>
		</section>
	);
}
