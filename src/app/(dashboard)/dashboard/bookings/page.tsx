"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Trash2 } from "lucide-react";

interface Booking {
  id: string;
  facilityName: string;
  sportType: string;
  location: string;
  date: string;
  timeSlot: string;
  price: number;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export default function MyBookings() {
  // Toggle with sample data or empty array [] to see the empty state
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage all your facility bookings
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
          {/* Calendar Icon Box */}
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8" />
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-1">
            No bookings yet
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Start by exploring our facilities
          </p>

          <Link
            href="/facilities"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-full transition-all duration-200 shadow-sm hover:shadow"
          >
            Browse Facilities
          </Link>
        </div>
      ) : (
        /* Bookings List */
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {booking.sportType}
                  </span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {booking.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  {booking.facilityName}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {booking.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {booking.timeSlot}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                <span className="text-lg font-bold text-gray-900">
                  ${booking.price}
                </span>
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Cancel Booking"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}