import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import BookingForm from "@/app/(root)/facilities/BookingForm";

interface TFacility {
  _id: string;
  facilityName: string;
  sportType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  description?: string;
  availableTimeSlots: string[];
}

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
        <p className="text-gray-500">
          We couldn&apos;t find the facility with ID: {id}
        </p>
        <Link
          href="/facilities"
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Facilities
        </Link>
      </div>
    );
  }

  const facility: TFacility = await res.json();

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
                src={facility.imageUrl || "/images/hero-football.jpg"}
                alt={facility.facilityName || "Default Facility"}
                fill
                priority
                className="object-cover"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-semibold text-xs px-3 py-1.5 rounded-md shadow-md uppercase tracking-wide">
                {facility.sportType || "Sport"}
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
                <p className="text-sm font-semibold text-gray-900">
                  {facility.location || "—"}
                </p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <Users className="w-4 h-4" /> Capacity
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {facility.capacity
                    ? `Up to ${facility.capacity} players`
                    : "—"}
                </p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <DollarSign className="w-4 h-4" /> Price
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {facility.pricePerHour != null
                    ? `৳${facility.pricePerHour}/hour`
                    : "—"}
                </p>
              </div>

              <div className="bg-gray-100/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
                  <Clock className="w-4 h-4" /> Slots
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {Array.isArray(facility.availableTimeSlots)
                    ? facility.availableTimeSlots.length
                    : 0}{" "}
                  available
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-100/80 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-gray-900">
                About this facility
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {facility.description || "Iconic clay court experience."}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5">
            <BookingForm facility={facility} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
