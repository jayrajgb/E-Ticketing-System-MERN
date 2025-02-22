import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { TrainTrack } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { adminToken, setAdminToken } = useContext(AdminContext)

  const navigate = useNavigate()
  
  const logout = () =>{
    navigate("/")
    adminToken && setAdminToken("")
    adminToken && localStorage.removeItem('admintoken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-b-gray-400 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <div className='flex justify-between gap-x-1 items-center text-lg cursor-pointer' onClick={() => navigate('/')}> 
          <TrainTrack color='#5f6fff' /> GoRail
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">Admin</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
