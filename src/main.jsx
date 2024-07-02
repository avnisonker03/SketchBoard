import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Layout from './Layout.jsx'
import SignIn from './components/SignIn.jsx'
import Signup from './components/Signup.jsx'
import SketchBoard from './components/SketchBoard.jsx'
import EmailVerification from './components/EmailVerification.jsx'



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/> 
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/sketchboard' element={<SketchBoard/>}/>
      <Route path="/verify-email" element={<EmailVerification />} />

    </Route>
))




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
