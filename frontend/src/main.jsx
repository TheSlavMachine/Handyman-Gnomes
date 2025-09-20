// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';


import App from './App.jsx';
import SchedulePage from './pages/SchedulePage.jsx'; 


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App /> 
  },
  { 
    path: '/schedule', 
    element: <SchedulePage /> 
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);