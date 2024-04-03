import { useContext } from 'react';
import { ContextLanguage } from '../stores';

const LANG_MISSING = {
	id: {
		body: 'Halaman yang Anda cari tidak ditemukan.',
	},
	en: {
		body: 'The page you are looking for is not found.',
	},
};

export function PageMissing() {
	const { language } = useContext(ContextLanguage);

	return (
		<section className="missing-page">
			<h1>404</h1>
			<p>{LANG_MISSING[language].body}</p>
		</section>
	);
}
