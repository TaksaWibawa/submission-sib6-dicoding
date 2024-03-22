import React from 'react';

import { LayoutBase } from './layouts';
import { PageAddNote, PageArchive, PageDetailNote, PageEditNote, PageHome, PageMissing } from './pages';
import { Route, Routes } from 'react-router-dom';

const LIST_ROUTES = [
	{
		path: '/',
		element: <PageHome />,
	},
	{
		path: '/archives',
		element: <PageArchive />,
	},
	{
		path: '/notes/new',
		element: <PageAddNote />,
	},
	{
		path: '/notes/:id',
		element: <PageDetailNote />,
	},
	{
		path: '/notes/:id/edit',
		element: <PageEditNote />,
	},
	{
		path: '*',
		element: <PageMissing />,
	},
];

function App() {
	return (
		<LayoutBase>
			<Routes>
				{LIST_ROUTES.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						element={route.element}
					/>
				))}
			</Routes>
		</LayoutBase>
	);
}

export default App;
