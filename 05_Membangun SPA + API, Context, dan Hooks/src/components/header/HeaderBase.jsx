import { ContextLanguage, ContextTheme } from '../../stores';
import { IconLanguage, IconLogout, IconThemeDark, IconThemeLight } from '../icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getAccessToken, getUserLogged, logout } from '../../utils/network-data';

const LANG_HEADER = {
	id: {
		title: 'Aplikasi Catatan',
		home: 'Beranda',
		archive: 'Terarsip',
	},
	en: {
		title: 'Notes App',
		home: 'Home',
		archive: 'Archived',
	},
};

export function HeaderBase() {
	const path = useLocation().pathname;
	const navigate = useNavigate();

	const { theme, toggleTheme } = useContext(ContextTheme);
	const { language, toggleLanguage } = useContext(ContextLanguage);

	const [user, setUser] = useState(null);

	const handleLogout = () => {
		setUser(null);
		logout();
		navigate('/login');
	};

	useEffect(() => {
		if (getAccessToken()) {
			getUserLogged()
				.then((response) => {
					setUser(response.data);
				})
				.catch(() => {
					handleLogout();
				});
		}
	}, [getAccessToken, navigate]);
	return (
		<header>
			<h1>
				<Link to={'/'}>{LANG_HEADER[language].title}</Link>
			</h1>
			<nav className="navigation">
				<ul>
					<li>
						<Link to={path === '/archives' ? '/' : '/archives'}>{path === '/archives' ? LANG_HEADER[language].home : LANG_HEADER[language].archive}</Link>
					</li>
				</ul>
			</nav>
			<button
				className="toggle-locale"
				onClick={toggleLanguage}
			>
				<IconLanguage />
			</button>
			<button
				className="toggle-theme"
				onClick={toggleTheme}
			>
				{theme === 'light' ? <IconThemeLight /> : <IconThemeDark />}
			</button>
			{user && (
				<button
					className="button-logout"
					onClick={handleLogout}
				>
					<IconLogout /> {user?.name}
				</button>
			)}
		</header>
	);
}
