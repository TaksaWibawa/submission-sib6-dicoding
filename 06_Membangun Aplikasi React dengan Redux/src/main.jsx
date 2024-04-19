import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { persistor, store } from './stores';
import { chakraTheme } from './configs';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        theme={chakraTheme}
        resetCSS
      >
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            <App />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
