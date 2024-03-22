import React from 'react';
import { NoteInput } from '../../components/input';
import { NoteList } from '../../components/list';

const NOTE_STATUS = {
	active: false,
	archived: true,
};

export function NoteBody({ notes, onDelete, onArchive, onAddNote }) {
	const getFilteredNotes = (flag) => {
		return notes.filter((note) => note.archived === flag);
	};

	return (
		<main className="note-app__body">
			<NoteInput onSubmit={onAddNote} />
			<NoteList
				title="Catatan Aktif"
				notes={getFilteredNotes(NOTE_STATUS.active)}
				{...{ onDelete, onArchive }}
			/>
			<NoteList
				title="Arsip"
				notes={getFilteredNotes(NOTE_STATUS.archived)}
				{...{ onDelete, onArchive }}
			/>
		</main>
	);
}
