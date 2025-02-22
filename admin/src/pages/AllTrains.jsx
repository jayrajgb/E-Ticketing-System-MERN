import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import trainimg from '../assets/trains.png'

const AllTrains = () => {

  const { adminToken, trains, getAllTrains } = useContext(AdminContext)

  useEffect(() => {
    if (adminToken) {
      getAllTrains()
    }
  }, [adminToken])


  return (
    <div className='sm:p-6 w-full'>
      <h1 className='mb-3 text-lg font-medium'>All Trains</h1>
      <div className='w-full grid-style gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
          trains.map((item, index) => (
            <div key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-700'>
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
          ))
        }
      </div>
    </div>
  )
}

export default AllTrains
