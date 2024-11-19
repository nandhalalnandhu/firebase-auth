import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Ensure App.jsx is correctly exported and imported

// Find the root element in the HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root and render the React app
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found. Ensure your HTML has an element with id="root".');
}
