import React, { useEffect, useState } from 'react'
import trainimg from '../assets/trains.png'
import { toast } from 'react-toastify'

const AddTrains = () => {
  
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [from, setFrom] = useState("Pune")
  const [to, setTo] = useState("Pune")
  const [startTime, setStartTime] = useState(4)
  const [intervals, setIntervals] = useState(1)
  const [seats, setSeats] = useState(40)
  const [price, setPrice] = useState(150)
  const [about, setAbout] = useState("")
  const [timings, setTimings] = useState({startTime, intervals})

  useEffect(()=>{
    setTimings({
      startTime,
      intervals
    })
  },[startTime, intervals])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if(from === to){
      toast.error("Source and Destination can't be same!")
    }else{
      console.log({
        name,
        code,
        from,
        to,
        startTime,
        intervals,
        seats,
        price,
        about,
        timings
      })
      console.log(
        typeof(startTime),
        typeof(intervals))
    }

  }

  
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>
        Add Trains
      </p>
      <div className='bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex justify-center p-2'>
          <img className='max-w-2/5 rounded' src={trainimg} alt='train' />
        </div>
        
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 mt-4'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Train Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border border-gray-200 px-3 py-2' type="text" placeholder='Enter Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>From</p>
              <select onChange={(e)=>setFrom(e.target.value)} value={from} className='border border-gray-200 px-3 py-2' required>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Satara">Satara</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Banglore">Banglore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Rajkot">Rajkot</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Start Timing</p>
              <select onChange={(e)=>setStartTime(Number(e.target.value))} value={startTime} className='border border-gray-200 px-3 py-2' required>
                <option value={4}>04:00 AM</option>
                <option value={5}>05:00 AM</option>
                <option value={6}>06:00 AM</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Seats</p>
              <input onChange={(e)=>setSeats(Number(e.target.value))} value={seats} className='border border-gray-200 px-3 py-2' type="number" min={0} placeholder={50} required />
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Train Code</p>
              <input onChange={(e)=>setCode(e.target.value)} value={code} className='border border-gray-200 px-3 py-2' type="text" placeholder='Enter Code' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>To</p>
              <select onChange={(e)=>setTo(e.target.value)} value={to} className='border border-gray-200 px-3 py-2' required>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Satara">Satara</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Banglore">Banglore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Rajkot">Rajkot</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Set Interval</p>
              <input onChange={(e)=>setIntervals(Number(e.target.value))} value={intervals} className='border border-gray-200 px-3 py-2' type="number" min={1} max={24} placeholder={1} required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Price</p>
              <input onChange={(e)=>setPrice(Number(e.target.value))} value={price} className='border border-gray-200 px-3 py-2' type="number" min={0} placeholder={150} required />
            </div>
            {/* <div>
              <p>Date</p>
              <input type="date" required />
            </div> */}
          </div>
        </div>
        <div className='text-gray-600'>
          <p className='mt-4 mb-2'>About Train</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border border-gray-200 px-3 py-2 w-full' placeholder='About Train' rows={3} />
        </div>
        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Train</button>
      </div>
    </form>
  )
}

export default AddTrains
