import React from 'react'
import { MoveRight } from 'lucide-react'
import train from '../assets/train-2.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  const navigate = useNavigate()
  
  return (
    <div className='min-h-screen'>
      <div className=' flex h-auto flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
            Book Tickets <br /> With GoRail
          </p>
          <button onClick={()=>navigate("/trains")} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-200 font-medium cursor-pointer'>
            Book Ticket <MoveRight />
          </button>
        </div>
        <div className='md:w-1/2 flex items-center'>
          <img className='w-full bottom-0 rounded-lg ' src={train} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
