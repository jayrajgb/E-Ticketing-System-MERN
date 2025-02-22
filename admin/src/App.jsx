import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AllTrains from './pages/AllTrains'
import AllBookings from './pages/AllBookings'
import AddTrains from './pages/AddTrains'
import Footer from './components/Footer'

const App = () => {
  
  const { adminToken } = useContext(AdminContext)
  
  return adminToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/trains' element={<AllTrains />} />
          <Route path='/bookings' element={<AllBookings />} />
          <Route path='/add-train' element={<AddTrains />} />
        </Routes>
      </div>
      <Footer />
    </div>
  ):(
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App
