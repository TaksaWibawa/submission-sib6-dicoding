import React from 'react';
import { NoteCard } from '../../card/note-card';

export const NoteList = ({ title, notes, onDelete, onArchive }) => {
	return (
		<>
			<h2>{title}</h2>
			<div className="notes-list">
				{notes.length > 0 ? (
					notes.map((note) => (
						<NoteCard
							key={note.id}
							data={note}
							{...{ onDelete, onArchive }}
						/>
					))
				) : (
					<p className="notes-list__empty-message">Tidak ada catatan</p>
				)}
			</div>
		</>
	);
};
