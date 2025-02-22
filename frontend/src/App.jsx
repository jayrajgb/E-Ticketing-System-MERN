import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Trains from './pages/Trains'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'
import Book from './pages/Book'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/trains' element={<Trains />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/book/:trainId' element={<Book />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
