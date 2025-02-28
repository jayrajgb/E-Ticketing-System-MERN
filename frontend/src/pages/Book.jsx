import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import trainimg from '../assets/trains.png'
import { IndianRupeeIcon, Info, Trash2 } from 'lucide-react'
import { toast } from "react-toastify";
import axios from "axios";

const Book = () => {
  const { trainId } = useParams()
  const { trains, userData, backendUrl, token } = useContext(AppContext)
  const [trainInfo, setTrainInfo] = useState(null)
  const [trainSlots, setTrainSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")
  const [passengers, setPassengers] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleBookTicket = async () => {
    if (isSubmitting) {
      return;
    }
    try {
      if (!userData) {
        toast.error("Please login to book tickets")
        return
      }

      if (!slotTime || passengers.some(p => !p.name || !p.age)) {
        toast.error("Please fill all passenger details")
        return
      }

      setIsSubmitting(true)

      // Get selected date
      const selectedDate = new Date()
      selectedDate.setDate(selectedDate.getDate() + slotIndex)

      // Format passengers data according to schema
      const formattedPassengers = passengers.map(passenger => ({
        name: passenger.name,
        age: parseInt(passenger.age),
        gender: passenger.gender,
        disability: passenger.disability,
        price: calculatePassengerPrice(passenger)
      }))

      const ticketData = {
        userId: userData._id,
        trainId: trainId,
        slotDate: selectedDate.toISOString().split('T')[0],
        slotTime: slotTime,
        passengers: formattedPassengers,
        status: "Booked"
      }

      const response = await axios.post(
        `${backendUrl}/api/user/book`,
        ticketData,
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success("Ticket booked successfully!")
        
        navigate("/trains")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setIsSubmitting(false)
    }
  }

  // Initialize with one passenger
  useEffect(() => {
    setPassengers([{
      id: Date.now(),
      name: '',
      age: '',
      gender: 'male',
      disability: false,
      discountedPrice: 0
    }])
  }, [])

  useEffect(() => {
    const trainInfo = trains.find(train => train._id === trainId)
    setTrainInfo(trainInfo)
  }, [trains, trainId])

  const getAvailableSlots = (trainInfo) => {
    if (!trainInfo) return;

    const allDaySlots = [];
    const today = new Date();

    // Generate slots for next 7 days
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const timeSlots = [];
      const startHour = trainInfo.timings.startTime; // 6 AM start time
      const intervals = trainInfo.timings.intervals;
      const totalHours = 24;
      const slotsPerDay = Math.floor((totalHours - startHour) / intervals);

      // Set initial time to 6 AM
      currentDate.setHours(startHour, 0, 0, 0);

      // Generate time slots for the day
      for (let j = 0; j < slotsPerDay; j++) {
        // Skip slots if it's today and the time has passed
        if (i === 0) {
          const now = new Date();
          if (currentDate < now) {
            currentDate.setHours(currentDate.getHours() + intervals);
            continue;
          }
        }

        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        currentDate.setHours(currentDate.getHours() + intervals);
      }

      allDaySlots.push(timeSlots);
    }

    setTrainSlots(allDaySlots);
  };

  useEffect(() => {
    if (trainInfo) {
      getAvailableSlots(trainInfo);
    }
  }, [trainInfo]);

  // Calculate price for a passenger based on their details
  const calculatePassengerPrice = (passenger) => {
    if (!trainInfo) return 0;
    const basePrice = trainInfo.price;

    // Free categories
    if (passenger.disability ||
      (passenger.age && (parseInt(passenger.age) >= 75 || parseInt(passenger.age) <= 2))) {
      return 0;
    }

    // 50% discount categories
    if (passenger.gender === 'female' ||
      (passenger.age && (parseInt(passenger.age) >= 3 && parseInt(passenger.age) <= 12))) {
      return basePrice * 0.5;
    }

    // Full price
    return basePrice;
  }

  // Update total price whenever passengers change
  useEffect(() => {
    const total = passengers.reduce((sum, passenger) => {
      return sum + calculatePassengerPrice(passenger);
    }, 0);
    setTotalPrice(total);
  }, [passengers, trainInfo]);

  const handlePassengerChange = (id, field, value) => {
    setPassengers(prev => prev.map(p => {
      if (p.id === id) {
        const updatedPassenger = { ...p, [field]: value };
        return updatedPassenger;
      }
      return p;
    }));
  }

  const addPassenger = () => {
    setPassengers(prev => [...prev, {
      id: Date.now(),
      name: '',
      age: '',
      gender: 'male',
      disability: false,
      discountedPrice: 0
    }]);
  }

  const removePassenger = (id) => {
    if (passengers.length > 1) {
      setPassengers(prev => prev.filter(p => p.id !== id));
    }
  }

  if (!trainInfo) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      {/* Train Info Section */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='size-full object-cover sm:max-w-96 rounded-lg' src={trainimg} alt="train" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{trainInfo.name}</p>
          <div className='flex items-center gap-2 text-lg mt-1 text-gray-600'>
            <p>{trainInfo.from} - {trainInfo.to}</p>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <Info size={16} /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{trainInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Base Ticket Price: <span className='flex items-center text-gray-600'><IndianRupeeIcon size={14} /> {trainInfo.price}</span>
          </p>
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white">
        <p className="text-xl font-medium mb-4">Select Date & Time</p>

        {/* Day Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Select Date:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Today', 'Tomorrow', ...Array(5).fill(0).map((_, i) =>
              new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            )].map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSlotIndex(idx);
                  setSlotTime("");
                }}
                className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${slotIndex === idx
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Select Time:</p>
          <div className="flex flex-wrap gap-3">
            {trainSlots[slotIndex]?.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-md text-sm ${slotTime === slot.time
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Passenger Management Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Passenger Details</h2>
          <button
            onClick={addPassenger}
            className="px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Add Passenger
          </button>
        </div>

        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Passenger {index + 1}</h3>
              {passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(passenger.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(passenger.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(passenger.id, 'age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter age"
                  min="0"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(passenger.id, 'gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={passenger.disability}
                    onChange={(e) => handlePassengerChange(passenger.id, 'disability', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-gray-700">Person with Disability</span>
                </label>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              Ticket Price: ₹{calculatePassengerPrice(passenger)}
              {calculatePassengerPrice(passenger) < trainInfo.price && (
                <span className="ml-2 text-green-600">
                  ({calculatePassengerPrice(passenger) === 0 ? 'Free' : '50% discount'})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total Price and Book Button */}
      <div className="mt-6 mb-8 flex flex-col items-end">
        <div className="text-xl font-medium mb-4">
          Total Price: <span className="text-primary">₹{totalPrice}</span>
        </div>
        <button
          onClick={handleBookTicket}
          className='bg-primary text-white text-sm font-medium px-14 py-3 rounded-full disabled:opacity-50 cursor-pointer'
          disabled={isSubmitting || !slotTime || passengers.some(p => !p.name || !p.age)}
        >
          {isSubmitting ? 'Booking...' : 'Book Tickets'}
        </button>
      </div>
    </div>
  )
}

export default Book