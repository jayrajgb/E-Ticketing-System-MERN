import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { TrainTrack, ChevronDown } from 'lucide-react'
import profilepic from '../assets/profile_pic.png'

const Navbar = () => {
  
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)


  return (
    <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
      <div className='flex justify-between gap-x-1 items-center text-lg'><TrainTrack /> GoRail </div>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/">
            <li className='list-style'>HOME</li>
            <hr className='hr-style' />
        </NavLink>
        <NavLink to="/trains">
            <li className='list-style'>TRAINS</li>
            <hr className='hr-style' />
        </NavLink>
        <NavLink to="/about">
            <li className='list-style'>ABOUT</li>
            <hr className='hr-style' />
        </NavLink>
        <NavLink to="/contact">
            <li className='list-style'>CONTACT</li>
            <hr className='hr-style' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
            token ? 
            (
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={profilepic} alt="profile" />
                    <ChevronDown className='w-4' />
                    <div className='absolute top-0 right-0 pt-14 text-gray-400 z-20 hidden group-hover:block font-medium'>
                        <div className='min-w-36 bg-neutral-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate("/profile")} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate("/bookings")} className='hover:text-black cursor-pointer'>Bookings History</p>
                            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <button onClick={()=>navigate("/login")} className='bg-primary text-white px-8 py-3 rounded-full hidden md:block cursor-pointer'>Create Account</button>
            )
        }
      </div>
    </div>
  )
}

export default Navbar
