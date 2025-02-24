import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TrainTrack, ChevronDown, Menu, X } from 'lucide-react';
import profilepic from '../assets/profile_pic.png';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setProfileMenuOpen(false);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setProfileMenuOpen(false);
  };

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
        <NavLink to='/'><li className='list-style'>HOME</li> <hr className='hr-style' /> </NavLink>
        <NavLink to='/trains'><li className='list-style'>TRAINS</li> <hr className='hr-style' /> </NavLink>
        <NavLink to='/about'><li className='list-style'>ABOUT</li> <hr className='hr-style' /> </NavLink>
        <NavLink to='/contact'><li className='list-style'>CONTACT</li> <hr className='hr-style' /> </NavLink>
        <NavLink target='_blank' to='https://e-ticketing-system-admin.onrender.com/'>
          <li className='border border-gray-400 px-5 text-xs py-1.5 rounded-full'>Admin Panel</li>
        </NavLink>
      </ul>
      
      {/* Desktop Profile/Login Section */}
      <div className='hidden md:flex items-center gap-4'>
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
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full cursor-pointer'>
            Login / SignUp
          </button>
        )}
      </div>

      {/* Mobile Profile Section */}
      <div className='md:hidden flex items-center gap-2'>
        {token ? (
          <img 
            className='w-8 rounded-full cursor-pointer' 
            src={profilepic} 
            alt='profile'
            onClick={() => setSidebarOpen(true)}
          />
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='bg-primary text-white px-4 py-2 rounded-full text-xs cursor-pointer'
          >
            Login
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md p-5 flex flex-col transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className='cursor-pointer self-end' onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
        
        {/* Mobile Profile Section in Sidebar */}
        {token && (
          <div className='flex items-center gap-3 mt-4 mb-6 px-2'>
            <img className='w-10 rounded-full' src={profilepic} alt='profile' />
            <div className='flex flex-col'>
              <span className='text-md font-medium uppercase'>{userData.name}</span>
            </div>
          </div>
        )}

        <nav className='flex flex-col gap-4'>
          <NavLink to='/' onClick={closeSidebar} className='hover:text-primary py-2'>HOME</NavLink>
          <NavLink to='/trains' onClick={closeSidebar} className='hover:text-primary py-2'>TRAINS</NavLink>
          <NavLink to='/about' onClick={closeSidebar} className='hover:text-primary py-2'>ABOUT</NavLink>
          <NavLink to='/contact' onClick={closeSidebar} className='hover:text-primary py-2'>CONTACT</NavLink>
          
          {token && (
            <>
              <NavLink to='/profile' onClick={closeSidebar} className='hover:text-primary py-2'>MY PROFILE</NavLink>
              <NavLink to='/bookings' onClick={closeSidebar} className='hover:text-primary py-2'>BOOKINGS HISTORY</NavLink>
              <button onClick={logout} className='text-left hover:text-primary py-2'>LOGOUT</button>
            </>
          )}
          
          <NavLink 
            target='_blank' 
            to='https://e-ticketing-system-admin.onrender.com/' 
            className='border border-gray-400 px-5 text-xs py-1.5 rounded-full text-center mt-4'
            onClick={closeSidebar}
          >
            Admin Panel
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;