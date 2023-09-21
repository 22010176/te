import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'reset-css'

import './src/API/Firestore'
import App from './src/App.js'

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </React.StrictMode>
)