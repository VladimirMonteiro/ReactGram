import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'


//pages 
import Home from './pages/home/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'


const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children: [
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>}
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
