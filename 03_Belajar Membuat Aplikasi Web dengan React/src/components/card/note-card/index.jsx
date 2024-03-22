import { showFormattedDate } from '../../../utils';
import React from 'react';

export const NoteCard = ({ data, onDelete, onArchive }) => {
	return (
		<div className="note-item">
			<div className="note-item__content">
				<h3 className="note-item__title">{data.title}</h3>
				<p className="note-item__date">{showFormattedDate(data.createdAt)}</p>
				<p className="note-item__body">{data.body}</p>
			</div>
			<div className="note-item__action">
				<button
					className="note-item__delete-button"
					onClick={() => onDelete(data.id)}
				>
					Delete
				</button>
				<button
					className="note-item__archive-button"
					onClick={() => onArchive(data.id)}
				>
					{data.archived ? 'Pindahkan' : 'Arsipkan'}
				</button>
			</div>
		</div>
	);
};
