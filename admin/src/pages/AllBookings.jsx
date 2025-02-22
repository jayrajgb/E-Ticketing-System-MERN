import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import trainimg from "../assets/trains.png"; // Ensure you have this image
import { IndianRupeeIcon } from "lucide-react"; // Ensure correct import

const AllBookings = () => {
  const { adminToken, bookings, getAllBookings, loading } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllBookings();
    }
  }, [adminToken]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings || bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="sm:p-6 w-full">
      <h1 className="mb-3 text-lg font-medium">All Bookings</h1>

      {bookings.map((booking) => (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-neutral-200 items-center"
          key={booking._id}
        >
          <div>
            <img className="w-48 bg-indigo-50" src={trainimg} alt="train" />
          </div>
          <div className="flex-1 text-md text-neutral-600">
            <p className="text-neutral-800 font-semibold">{booking?.trainInfo?.name}</p>
            <p>
              <span className="text-neutral-800 font-medium">From: </span>
              {booking?.trainInfo?.from}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">To: </span>
              {booking?.trainInfo?.to}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">Date: </span>
              {booking?.slotDate
                ? new Date(booking.slotDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    weekday: "short",
                  })
                : "N/A"}{" "}
              {booking?.slotTime || ""}
            </p>
            <p>
              <span className="text-neutral-800 font-medium">Passengers: </span>
              {booking?.passengers?.map((p) => p.name).join(", ") || "N/A"}
            </p>
            <p className="flex items-center font-semibold">
              <span className="text-neutral-800 font-medium">Total Price: </span>
              <IndianRupeeIcon width={12} /> {booking?.totalAmount || 0}
            </p>
            <p
              className={`mt-1 ${
                booking?.status === "Booked"
                  ? "text-green-600"
                  : booking?.status === "Cancelled"
                  ? "text-red-600"
                  : "text-yellow-600"
              } font-medium`}
            >
              Status: {booking?.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBookings;
