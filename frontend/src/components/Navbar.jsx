import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TrainTrack, ChevronDown, Menu, X } from 'lucide-react';
import profilepic from '../assets/profile_pic.png';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { token, setToken } = useContext(AppContext)

  const logout = () => {
    setProfileMenuOpen(false)
    setToken("")
    localStorage.removeItem("token")
  }

  return (
    <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
      <div className='flex items-center gap-2'>
        <button className='cursor-pointer md:hidden' onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <div className='flex justify-between gap-x-1 items-center text-lg cursor-pointer' onClick={() => navigate('/')}> 
          <TrainTrack color='#5f6fff' /> GoRail
        </div>
      </div>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='list-style'>HOME</li>
          <hr className='hr-style' />
        </NavLink>
        <NavLink to='/trains'>
          <li className='list-style'>TRAINS</li>
          <hr className='hr-style' />
        </NavLink>
        <NavLink to='/about'>
          <li className='list-style'>ABOUT</li>
          <hr className='hr-style' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='list-style'>CONTACT</li>
          <hr className='hr-style' />
        </NavLink>
        <NavLink target='_blank' to='https://e-ticketing-system-frontend.onrender.com/'>
          <li className='border border-gray-400 px-5 text-xs py-1.5 rounded-full'>Admin Panel</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer relative' onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
            <img className='w-8 rounded-full' src={profilepic} alt='profile' />
            <ChevronDown className='w-4' />
            {profileMenuOpen && (
              <div className='absolute w-36 top-10 right-0 text-gray-400 z-20 bg-gray-50 border border-indigo-400 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => { navigate('/profile'); setProfileMenuOpen(false); }} className='hover:text-primary cursor-pointer'>My Profile</p>
                <p onClick={() => { navigate('/bookings'); setProfileMenuOpen(false); }} className='hover:text-primary cursor-pointer'>Bookings History</p>
                <p onClick={logout} className='hover:text-primary cursor-pointer'>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full hidden md:block cursor-pointer'>
            Login / SignUp
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      {sidebarOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50' onClick={() => setSidebarOpen(false)}>
          <div className='fixed left-0 top-0 w-64 h-full bg-white shadow-md p-5 flex flex-col' onClick={(e) => e.stopPropagation()}>
            <button className='cursor-pointer self-end' onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
            <nav className='mt-10 flex flex-col gap-4'>
              <NavLink to='/' onClick={() => setSidebarOpen(false)}>HOME</NavLink>
              <NavLink to='/trains' onClick={() => setSidebarOpen(false)}>TRAINS</NavLink>
              <NavLink to='/about' onClick={() => setSidebarOpen(false)}>ABOUT</NavLink>
              <NavLink to='/contact' onClick={() => setSidebarOpen(false)}>CONTACT</NavLink>
              <NavLink target="_blank" href="https://e-ticketing-system-admin.onrender.com" class="border px-5 text-xs py-1.5 rounded-full">Admin Panel</NavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
