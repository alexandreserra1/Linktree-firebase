import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Alterei a importação do RouterProvider
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        {/* Conteúdo da sua aplicação aqui */}
      </Router>
    </React.StrictMode>
  );
}
