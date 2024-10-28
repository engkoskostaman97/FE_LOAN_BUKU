/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Import di file main.jsx atau App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

//import AuthProvider
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
)