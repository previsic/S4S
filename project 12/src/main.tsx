import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

function AppWrapper() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 100);
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AppWrapper />
    </LanguageProvider>
  </StrictMode>
);
