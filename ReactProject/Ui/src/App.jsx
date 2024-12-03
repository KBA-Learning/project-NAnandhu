import React from 'react'
// import NavBar from './Components/NavBar'
// import SearchBar from './Components/SearchBar'
// import Grid from './Components/Grid'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Index from './Pages/Index'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddBlogs from './Pages/AddBlogs'
import AdminHome from './Pages/AdminHome'
import ViewBlogs from './Pages/ViewBlogs'
import View from './Pages/View'
import Update from './Pages/Update'
const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
     <Route path='/' element={<Index />}></Route>
     <Route path='/signup' element={<Signup />}></Route>
     <Route path='/login' element={<Login />}></Route>
     <Route path='/home' element={<Home />}></Route>
     <Route path='/addblog' element={<AddBlogs />}></Route>
     <Route path='/adminhome' element={<AdminHome />}></Route>
     <Route path='/viewblog' element={<ViewBlogs />}></Route>
     <Route path='/view' element={<View />}></Route>
     <Route path='/update/:id' element={<Update />}></Route>
     <Route path='/comment' element={<Update />}></Route>
     </>
    )
  )
  return (
    <RouterProvider router={router} />

  )
}

export default App