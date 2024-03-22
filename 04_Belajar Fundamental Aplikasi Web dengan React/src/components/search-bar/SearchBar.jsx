import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SearchBar() {
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
				placeholder="Cari berdasarkan judul ..."
				value={search}
				onChange={handleChange}
			/>
		</section>
	);
}
