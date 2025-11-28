import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Registrar el Service Worker de la PWA
registerSW({
  onNeedRefresh() {
    console.log('🔄 Hay una nueva versión disponible.');
  },
  onOfflineReady() {
    console.log('✅ App lista para usar sin conexión.');
  },
});

// Punto de entrada de la aplicación REACT (componente Raíz)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> 
  </StrictMode>
);
