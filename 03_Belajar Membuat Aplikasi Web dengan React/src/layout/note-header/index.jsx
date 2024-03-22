import React, { useState } from 'react';

export function NoteHeader({ onSearch }) {
	const [search, setSearch] = useState('');

	const handleSearchChange = (event) => {
		const target = event.target.value;
		setSearch(target);
		onSearch(target);
	};

	return (
		<header className="note-app__header">
			<h1>Notes</h1>
			<input
				className="note-search"
				name="search"
				type="text"
				placeholder="Cari Catatan ..."
				value={search}
				onChange={handleSearchChange}
			/>
		</header>
	);
}
