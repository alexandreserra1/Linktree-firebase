import React from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './App';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router}>
        {/* Conteúdo da sua aplicação aqui */}
      </RouterProvider>
    </React.StrictMode>
  );
}
