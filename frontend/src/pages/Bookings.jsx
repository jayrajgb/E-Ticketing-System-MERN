import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import trainimg from '../assets/trains.png'
import { IndianRupeeIcon } from 'lucide-react'

const Bookings = () => {

  const {trains} = useContext(AppContext) // using for sample, booking info will come instead.

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-neutral-800 border-b border-neutral-300'>Bookings History</p>
      {trains.slice(0,3).map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-neutral-200 items-center' key={index}>
          <div>
            <img className='w-48 bg-indigo-50' src={trainimg} alt="train" />
          </div>
          <div className='flex-1 text-md text-neutral-600'>
            <p className='text-neutral-800 font-semibold'>{item.name}</p>
            <p className='font-semibold'>{item.code}</p>
            <p><span className='text-neutral-800 font-medium'>From: </span>{item.from}</p>
            <p><span className='text-neutral-800 font-medium'>To: </span>{item.to}</p>
            <p><span className='text-neutral-800 font-medium'>Date: </span> 24/02/2024 Mon 06:00 AM</p>
            <p className='flex items-center font-semibold'><span className='text-neutral-800 font-medium'>Total Price: </span><IndianRupeeIcon width={12} /> {item.price}</p>
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
            <button className='text-sm text-neutral-400 text-center sm:min-w-48 py-2 border border-neutral-400 hover:bg-primary hover:text-white transition-all duration-200'>Pay</button>
            <button className='text-sm text-neutral-400 text-center sm:min-w-48 py-2 border border-neutral-400 hover:bg-red-700 hover:text-white transition-all duration-200'>Cancel Booking</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bookings
