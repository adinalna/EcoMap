import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from "./router.jsx";
import { UserProvider } from './contexts/UserProvider.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
  </React.StrictMode>,
)
