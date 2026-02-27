import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AccessProvider } from './utils/AccessContext.jsx'

createRoot(document.getElementById('root')).render(
  <AccessProvider>
    <App />
  </AccessProvider>
);
