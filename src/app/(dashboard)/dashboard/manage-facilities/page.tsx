"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, MapPin, DollarSign, Users, Edit, Trash2 } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  sportType: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  imageUrl: string;
}

export default function ManageFacilities() {
  // Set to empty array [] to show the empty state matching the screenshot
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this facility?")) {
      setFacilities((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage My Facilities</h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit or remove your listed venues
          </p>
        </div>

        {/* Top Right Add New Button */}
        <Link
          href="/dashboard/add-facility"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      {/* Main Content Card */}
      {facilities.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
          {/* Icon Box */}
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">
            🏟️
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-1">
            No facilities listed yet
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Add your first facility to start receiving bookings
          </p>

          <Link
            href="/dashboard/add-facility"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-sm"
          >
            Add Facility
          </Link>
        </div>
      ) : (
        /* Facilities Grid List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <img
                  src={facility.imageUrl}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {facility.sportType}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {facility.name}
                  </h3>
                  <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {facility.location}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      ${facility.pricePerHour} / hour
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      Max {facility.capacity} Players
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => alert(`Edit ${facility.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(facility.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}