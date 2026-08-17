import { StrictMode } from 'react'
import { Toaster } from "react-hot-toast";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/footer.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"
  containerStyle={{
    zIndex: 9999999,
  }}
  toastOptions={{
    duration: 3000,
    style: {
      zIndex: 9999999,
    },
    success: {
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid #27272a",
      },
    },
    error: {
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid #27272a",
      },
    },
  }}
/>
  </StrictMode>,
)
