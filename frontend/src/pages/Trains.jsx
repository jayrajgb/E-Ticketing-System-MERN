import React, { useContext, useEffect } from 'react'
// import { trains } from '../assets/assets'
import trainimg from '../assets/trains.png'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Trains = () => {

  const navigate = useNavigate()

  const { trains } = useContext(AppContext)

  if(!trains || trains.length === 0){
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen'>
      <p className='text-gray-600'>Browse through various destinations.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <div>
            <p className='text-md text-gray-800'>From</p>
            <select className='w-[94vw] sm:w-32 md:w-48 p-1 border border-gray-300 rounded transition-all cursor-pointer' name="from">
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Mumbai">Nagpur</option>
            </select>
          </div>
          <div>
            <p className='text-md text-gray-800'>To</p>
            <select className='w-[94vw] sm:w-32 md:w-48 p-1 border border-gray-300 rounded transition-all cursor-pointer' name="to">
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Kolhapur">Kolhapur</option>
              <option value="Banglore">Banglore</option>
            </select>
          </div>
        </div> */}

        <div className='w-full grid-style gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {trains.map((item, index) => (
            <div key={index} onClick={() => navigate(`/book/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-700'>
              <img className='bg-blue-50' src={trainimg} alt="trains" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='size-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.from} - {item.to}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trains

