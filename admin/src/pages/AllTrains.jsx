import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import trainimg from '../assets/trains.png'
import { toast } from 'react-toastify'

const AllTrains = () => {

  const { adminToken, trains, getAllTrains, searchTrains } = useContext(AdminContext)

  const [key, setKey] = useState("")

  useEffect(() => {
    if (adminToken) {
      getAllTrains()
    }
  }, [adminToken])

  const searchHandler = () => {
    if(adminToken){
      searchTrains(key)
      setKey("")
    }
    else{
      toast.error("Key must not be empty!")
    }
  }

  return (
    <div className='sm:p-6 min-h-screen w-full border-l border-l-gray-400'>
      <h1 className='mb-3 text-lg font-medium'>All Trains</h1>
      <div className='flex gap-x-4 py-4 justify-center items-center mb-2'>
        <span>Browse Trains</span>
        <input type="text" onChange={(e)=>setKey(e.target.value)} value={key} className='py-1 px-3 outline-primary border-1 border-primary cursor-pointer  hover:outline-indigo-600 rounded-full w-2/5'  />
        <button onClick={searchHandler} className='cursor-pointer bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-indigo-600'>Search</button>
      </div>
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
