import { Link, useLocation } from 'react-router-dom';

export function HeaderBase() {
	const path = useLocation().pathname;

	return (
		<header>
			<h1>
				<Link to={'/'}>Aplikasi Catatan</Link>
			</h1>
			<nav className="navigation">
				<ul>
					<li>
						<Link to={path === '/archives' ? '/' : '/archives'}>{path === '/archives' ? 'Beranda' : 'Arsip'}</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
