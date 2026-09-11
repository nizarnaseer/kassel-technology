import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  const html = renderToString(<App />);
  console.log("Rendered successfully!");
} catch (error) {
  console.error("REACT RENDER ERROR:", error);
}
