import React, { useState } from 'react';
import { NoteBody, NoteHeader } from './layout';
import { getInitialData as INITIAL_DATA } from './utils';

function App() {
	const [notes, setNotes] = useState(INITIAL_DATA);
	const [searchResults, setSearchResults] = useState(notes);

	const handleAddNote = (newNote) => {
		const updatedNotes = [...notes, newNote];
		setNotes(updatedNotes);
		setSearchResults(updatedNotes);
	};

	const handleSearchNote = (characters) => {
		setSearchResults(characters ? notes.filter((note) => note.title.toLowerCase().includes(characters.toLowerCase())) : notes);
	};

	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		setSearchResults(updatedNotes);
	};
	const handleArchiveNote = (id) => {
		const updatedNotes = notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
		setNotes(updatedNotes);
		setSearchResults(updatedNotes);
	};

	return (
		<>
			<NoteHeader onSearch={handleSearchNote} />
			<NoteBody
				notes={searchResults}
				onAddNote={handleAddNote}
				onDelete={handleDeleteNote}
				onArchive={handleArchiveNote}
			/>
		</>
	);
}

export default App;
