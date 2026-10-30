import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { title } from "process";

export const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Server Component Fetching
  const res = await fetch(`http://localhost:8000/facilities/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Facility Not Found</h2>
        <p className="text-gray-500">We couldn&apos;t find the facility with ID: {id}</p>
        <Link
          href="/facilities"
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Facilities
        </Link>
      </div>
    );
  }

  const facility = await res.json();

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation */}
        <Link
          href="/facilities"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Facilities
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Overview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Banner Image Container */}
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
              <Image
                src={facility.imageUrl || "/images/default-facility.jpg"}
                alt={facility.facilityName || "Default Facility"}
                fill
                priority
                className="object-cover"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-semibold text-xs px-3 py-1.5 rounded-md shadow-md uppercase tracking-wide">
                {facility.category || "TENNIS"}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {facility.facilityName || "Default Facility"}
              </h1>
            </div>

            {/* Stats / Info Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <MapPin className="w-4 h-4" /> Location
                </div>
                <p className="text-sm font-semibold text-gray-900">{facility.location || "Paris, France"}</p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <Users className="w-4 h-4" /> Capacity
                </div>
                <p className="text-sm font-semibold text-gray-900">{facility.capacity || "Up to 4 players"}</p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <DollarSign className="w-4 h-4" /> Price
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${facility.price || 80}/hour
                </p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <Clock className="w-4 h-4" /> Slots
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {facility.slots ?? 0} available
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-100/80 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-gray-900">About this facility</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {facility.description || "Iconic clay court experience."}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book This Facility</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Fill in your details to reserve this spot
              </p>
            </div>

            <form className="space-y-4">
              {/* Facility Name Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  FACILITY
                </label>
                <input
                  type="text"
                  readOnly
                  value={title}
                  className="w-full bg-gray-50/70 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 font-medium focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Booking Date Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  BOOKING DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Time Slot Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  TIME SLOT
                </label>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none transition-all">
                    <option value="">Select a time slot</option>
                    <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                    <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                    <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                  </select>
                  <Clock className="w-4 h-4 text-gray-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Duration Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  DURATION (HOURS)
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Price Breakdown Banner */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 space-y-2 mt-4">
                <div className="flex justify-between items-center text-xs font-medium text-emerald-800">
                  <span>${facility.price || 80}/hr × 1 hr</span>
                  <span>${facility.price || 80}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-emerald-900 pt-1 border-t border-emerald-100/60">
                  <span>Total Price</span>
                  <span className="text-base text-emerald-600">${facility.price || 80}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-200 ease-in-out active:scale-[0.99] mt-2"
              >
                Confirm Booking
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;