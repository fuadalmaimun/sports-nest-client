
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
  AlertCircle,
} from "lucide-react";

interface Booking {
  _id: string;
  facilityId: string;
  facilityName: string;
  sportType: string;
  location: string;
  imageUrl: string;
  email: string;
  date: string;
  timeSlot: string;
  duration: number;
  price: number | null;
  status: string;
}

const MyBookingPage = async () => {
  // 1. Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Check authentication
  if (!session) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold">Login Required</h2>
        <p className="text-gray-500 mt-2">
          Please login to see your bookings.
        </p>
      </div>
    );
  }

  // 3. Fetch bookings from backend
  let bookings: Booking[] = [];

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL || "http://localhost:8000"}/bookings/${encodeURIComponent(session.user.email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    bookings = await res.json();
  } catch (error) {
    console.error("Booking Fetch Error:", error);
  }

  // 4. Calculate booking statistics
  const confirmedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "confirmed"
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "pending"
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
            SportsNest Dashboard
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My Bookings ({bookings.length})
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track your sports facility bookings.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-gray-500 font-medium">Total Bookings</p>
            <h2 className="text-3xl font-bold mt-3">
              {bookings.length}
            </h2>
            <CalendarDays className="text-green-600 mt-3" size={24} />
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-gray-500 font-medium">Confirmed</p>
            <h2 className="text-3xl font-bold mt-3">
              {confirmedBookings.length}
            </h2>
            <Trophy className="text-blue-600 mt-3" size={24} />
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-gray-500 font-medium">Pending</p>
            <h2 className="text-3xl font-bold mt-3">
              {pendingBookings.length}
            </h2>
            <Clock className="text-orange-500 mt-3" size={24} />
          </div>

        </div>

        {/* Booking List */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          All Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <CalendarDays
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-xl font-bold text-gray-800">
              No Bookings Found
            </h3>

            <p className="text-gray-500 mt-2">
              You haven&apos;t booked any sports facilities yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* Facility Image */}
                <div className="relative h-52 bg-gray-100">
                  <Image
                    src={booking.imageUrl || "/images/hero-football.jpg"}
                    alt={booking.facilityName || "Sports facility"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <span className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    {booking.status || "Pending"}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="p-6">

                  <div className="flex justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.facilityName}
                      </h3>

                      <p className="text-sm text-green-600 font-semibold mt-1">
                        {booking.sportType}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        Total Price
                      </p>

                      <p className="text-xl font-bold">
                        {booking.price != null
                          ? `৳${booking.price}`
                          : "Free"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">

                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-green-600" />
                      {booking.location}
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-green-600" />
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-green-600" />
                      {booking.timeSlot} ({booking.duration} hour
                      {booking.duration !== 1 ? "s" : ""})
                    </div>

                  </div>

                  <div className="border-t mt-5 pt-4 flex justify-between">
                    <p className="text-xs text-gray-400">
                      Booking ID: {booking._id.slice(-8)}
                    </p>

                    <span className="text-xs font-semibold text-green-600">
                      SportsNest
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default MyBookingPage;
