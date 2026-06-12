import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

const updateSW = registerSW({
  onNeedRefresh() {
    const shouldUpdate = window.confirm(
      'Hay una nueva versión de Ciudad Colaborativa disponible. ¿Querés actualizarla ahora?',
    );

    if (shouldUpdate) {
      void updateSW(true);
    }
  },
  onOfflineReady() {
    console.info(
      'La interfaz básica quedó almacenada. Las funciones que consultan o envían datos requieren conexión con el servidor.',
    );
  },
  onRegisterError(error) {
    console.error('No se pudo registrar el service worker:', error);
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
