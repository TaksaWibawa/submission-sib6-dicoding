import React from 'react';

import { LayoutBase } from './layouts';
import { PageAddNote, PageArchive, PageDetailNote, PageHome, PageLogin, PageMissing, PageRegister } from './pages';
import { useRoutes } from 'react-router-dom';
import { RoutePrivate, RouteProtected } from './routes';

function App() {
	const routes = useRoutes([
		{
			element: <RouteProtected />,
			children: [
				{ path: 'login', element: <PageLogin /> },
				{ path: 'register', element: <PageRegister /> },
			],
		},
		{
			path: '/',
			element: <RoutePrivate />,
			children: [
				{ index: true, element: <PageHome /> },
				{ path: 'archives', element: <PageArchive /> },
				{ path: 'notes/new', element: <PageAddNote /> },
				{ path: 'notes/:id', element: <PageDetailNote /> },
			],
		},
		{ path: '*', element: <PageMissing /> },
	]);

	return <LayoutBase>{routes}</LayoutBase>;
}

export default App;
