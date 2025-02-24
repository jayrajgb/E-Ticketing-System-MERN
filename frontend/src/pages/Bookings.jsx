import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import trainimg from '../assets/trains.png';
import { IndianRupeeIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bookings = () => {
  const { userData, backendUrl, token, loadUserProfile } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/bookings`, {
        headers: { token },
      });
      if (data.success) {
        setBookings(data.bookings);
        // console.log(data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancelBooking = async (ticketId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/bookings/cancel/${ticketId}`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Booking cancelled successfully');
        fetchBookings(); // Refresh bookings list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveBooking = async (ticketId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/bookings/remove/${ticketId}`, {
        headers: { token },
      });
      if (data.success) {
        toast.success('Booking removed successfully');
        fetchBookings(); // Refresh bookings list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-600">
        No bookings found
      </div>
    );
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-neutral-800 border-b border-neutral-300">
        Bookings History
      </p>
      {bookings.map((booking) => (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-neutral-200 items-center "
          key={booking._id}
        >
          <div>
            <img className="w-48 bg-indigo-50 rounded" src={trainimg} alt="train" />
          </div>
          <div className="flex-1 text-md text-neutral-600 py-8 sm:py-6">
            <p className="text-neutral-800 font-semibold">{booking.trainInfo.name}</p>
            <p>
              <span className="text-neutral-800 font-medium">From: </span>
              {booking.trainInfo.from}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">To: </span>
              {booking.trainInfo.to}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">Date: </span>
              {new Date(booking.slotDate).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'short',
              })}{' '}
              {booking.slotTime}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">Passengers: </span>
              {booking.passengers.map((p) => p.name).join(', ')}
            </p>
            <p className="flex items-center font-semibold">
              <span className="text-neutral-800 font-medium">Total Price: </span>
              <IndianRupeeIcon width={12} /> {booking.totalAmount}
            </p>
            <p
              className={`mt-1 ${
                booking.status === 'Booked'
                  ? 'text-green-600'
                  : booking.status === 'Cancelled'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              } font-medium`}
            >
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
          </div>
          <div></div>
          <div className="flex flex-col gap-2 justify-center">
            {(booking.status === 'Pending' || booking.status === 'Booked') && (
              <>
                <button
                  className="text-sm bg-primary sm:bg-white text-white sm:text-neutral-400 text-center sm:min-w-48 py-2 sm:border sm:border-neutral-400 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Checkout
                </button>
                <button
                  className="text-sm bg-red-700 sm:bg-white text-white sm:text-neutral-400 text-center sm:min-w-48 py-2 sm:border sm:border-neutral-400 hover:bg-red-700 hover:text-white transition-all duration-200"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </>
            )}
            {booking.status === 'Cancelled' && (
              <button
                className="text-sm text-center sm:min-w-48 py-2 sm:border bg-red-700 sm:bg-white text-white sm:text-neutral-400 sm:border-neutral-400 hover:bg-red-700 hover:text-white transition-all duration-200"
                onClick={() => handleRemoveBooking(booking._id)}
              >
                Remove Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
