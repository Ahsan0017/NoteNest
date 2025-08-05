import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import './index.css';
import App from './App';

// Create a root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
