import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CipherApp from './frontend/cipherApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CipherApp />
  </StrictMode>,
)
