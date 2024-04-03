import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ProviderAction, ProviderLanguage, ProviderTheme } from './stores';
import App from './App';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ProviderTheme>
			<ProviderLanguage>
				<ProviderAction>
					<App />
				</ProviderAction>
			</ProviderLanguage>
		</ProviderTheme>
	</BrowserRouter>
);
