import React, { useState } from 'react';

const MAX_CHARACTERS = 50;

export const NoteInput = ({ onSubmit }) => {
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentBody, setCurrentBody] = useState('');
	const [remainingChars, setRemainingChars] = useState(MAX_CHARACTERS);

	const handleTitleChange = (event) => {
		const title = event.target.value;

		if (title.length <= MAX_CHARACTERS) {
			setCurrentTitle(title);
			setRemainingChars(MAX_CHARACTERS - title.length);
		}
	};

	const handleBodyChange = (event) => {
		const body = event.target.value;
		setCurrentBody(body);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			id: +new Date(),
			title: currentTitle,
			body: currentBody,
			archived: false,
			createdAt: new Date().toISOString(),
		};
		onSubmit(data);
		setCurrentTitle('');
		setCurrentBody('');
		setRemainingChars(MAX_CHARACTERS);
	};

	return (
		<div className="note-input">
			<h2>Buat Catatan</h2>
			<form onSubmit={handleSubmit}>
				<p className="note-input__title__char-limit">Sisa Karakter : {remainingChars}</p>
				<input
					className="note-input__title"
					name="title"
					type="text"
					placeholder="Ini adalah judul ..."
					required
					value={currentTitle}
					onChange={handleTitleChange}
				/>
				<textarea
					className="note-input__body"
					name="message"
					placeholder="Tuliskan catatanmu di sini ..."
					required
					value={currentBody}
					onChange={handleBodyChange}
				/>
				<button type="submit">Buat</button>
			</form>
		</div>
	);
};
