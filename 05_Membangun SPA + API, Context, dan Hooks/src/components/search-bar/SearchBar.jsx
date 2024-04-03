import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContextLanguage } from '../../stores';

const LANG_SEARCH = {
	id: {
		placeholder: 'Cari berdasarkan judul ...',
	},
	en: {
		placeholder: 'Search by title ...',
	},
};

export function SearchBar() {
	const { language } = useContext(ContextLanguage);

	const [search, setSearch] = useState('');
	const [, setSearchParams] = useSearchParams();

	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		if (search !== '') {
			setSearchParams({ keyword: search });
		} else {
			setSearchParams({});
		}
	}, [search, setSearchParams]);

	return (
		<section className="search-bar">
			<input
				id="search"
				type="text"
				placeholder={LANG_SEARCH[language].placeholder}
				value={search}
				onChange={handleChange}
			/>
		</section>
	);
}
