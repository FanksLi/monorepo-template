import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
