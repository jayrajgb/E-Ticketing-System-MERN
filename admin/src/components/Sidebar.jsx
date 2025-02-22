import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { HomeIcon, PlusSquareIcon, Ticket, TrainFrontIcon } from 'lucide-react'

const Sidebar = () => {
  
  const { adminToken } = useContext(AdminContext)
  
  return (
    <div className='min-h-screen bg-white border-r border-r-gray-400'>
      {
        adminToken && (
            <ul className='text-neutral-700 mt-5'>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-gray-100 border-r-4 border-r-primary" : ""}`} to={"/dashboard"}>
                    <HomeIcon size={20} />
                    Dashboard
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-gray-100 border-r-4 border-r-primary" : ""}`} to={"/bookings"}>
                    <Ticket size={20} />
                    Bookings
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-gray-100 border-r-4 border-r-primary" : ""}`} to={"/trains"}>
                    <TrainFrontIcon size={20} />
                    Trains
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-gray-100 border-r-4 border-r-primary" : ""}`} to={"/add-train"}>
                    <PlusSquareIcon size={20} />
                    Add Trains
                </NavLink>
            </ul>
        )
      }
    </div>
  )
}

export default Sidebar
