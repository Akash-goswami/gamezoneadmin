import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import './assets/css/LoginPageAdmin.css'

import App from './App';
import { BackgroundContextProvider } from './context/BackgroundContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BackgroundContextProvider>
    <App />
    </BackgroundContextProvider>
  </React.StrictMode>,
);
