"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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

export default function AllFacilitiesPage() {
  const [facilities, setFacilities] = useState<TFacility[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // প্রতি page-এ ১০টি facility
  const itemsPerPage = 10;

  
useEffect(() => {
  const fetchFacilities = async () => {
    try {
      const res = await fetch("http://localhost:8000/facilities");

      if (!res.ok) {
        throw new Error(`Failed to fetch facilities: ${res.status}`);
      }

      const data: TFacility[] = await res.json();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  fetchFacilities();
}, []);

  // Search and sport filter
  const filteredFacilities = facilities
    .filter((facility) => {
      const matchesSearch = facility.facilityName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesSport =
        selectedSport === "All" ||
        facility.sportType.toLowerCase() === selectedSport.toLowerCase();

      return matchesSearch && matchesSport;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.pricePerHour - b.pricePerHour
        : b.pricePerHour - a.pricePerHour
    );

  // Pagination calculation
  const totalPages = Math.ceil(
    filteredFacilities.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentFacilities = filteredFacilities.slice(
    startIndex,
    startIndex + itemsPerPage
  );



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          All Facilities
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Browse {filteredFacilities.length} sports venues available for booking
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by facility name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sport Filter */}
          <select
            value={selectedSport}
            onChange={(e) => {
              setSelectedSport(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-50 border-0 rounded-xl text-sm text-gray-600 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Sports</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
            <option value="badminton">Badminton</option>
            <option value="swimming">Swimming</option>
            <option value="basketball">Basketball</option>
          </select>

          {/* Price: Low to High */}
          <button
            onClick={() => {
              setSortOrder("asc");
              setCurrentPage(1);
            }}
            className="flex items-center gap-1 px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Price
          </button>

          {/* Price: High to Low */}
          <button
            onClick={() => {
              setSortOrder("desc");
              setCurrentPage(1);
            }}
            className="flex items-center gap-1 px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            Price
          </button>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {currentFacilities.map((facility) => (
          <div
            key={facility._id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Image Header with Badges */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <img
                src={facility.imageUrl}
                alt={facility.facilityName}
                className="w-full h-full object-cover"
              />

              {/* Sport Badge */}
              <span className="absolute top-3 left-3 bg-amber-100/90 backdrop-blur-sm text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {facility.sportType}
              </span>

              {/* Price Badge */}
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                ৳{facility.pricePerHour}{" "}
                <span className="text-[10px] text-gray-500 font-normal">
                  /hr
                </span>
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-1">
                  {facility.facilityName}
                </h3>

                <div className="space-y-2 text-xs text-gray-500 mb-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="line-clamp-1">
                      {facility.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>Up to {facility.capacity} players</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      {facility.availableTimeSlots?.length || 0} slots available
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <Link
                href={`/facilities/${facility._id}`}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredFacilities.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No facilities found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-8 h-8 rounded-full font-semibold text-xs flex items-center justify-center ${
                  currentPage === page
                    ? "bg-emerald-500 text-white"
                    : "text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
