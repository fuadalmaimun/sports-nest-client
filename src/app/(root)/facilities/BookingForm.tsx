"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface BookingFormProps {
  facility: {
    _id: string;
    facilityName: string;
    sportType: string;
    location: string;
    pricePerHour: number;
    imageUrl?: string;
    availableTimeSlots?: string[];
  };
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

const labelClass = "text-xs font-bold text-gray-500";

export default function BookingForm({ facility }: BookingFormProps) {
  const { data: session, isPending } = authClient.useSession();
  const sessionEmail = session?.user?.email ?? "";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Use the facility's real time slots; fall back to a small default list.
  const timeSlots = useMemo(() => {
    const slots = facility.availableTimeSlots;
    return Array.isArray(slots) && slots.length > 0
      ? slots
      : ["09:00-10:00", "10:00-11:00", "14:00-15:00"];
  }, [facility.availableTimeSlots]);

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Always book against the logged-in user so the dashboard can find it.
    const email = sessionEmail || String(formData.get("email") || "").trim();

    if (!email) {
      setMessage({ type: "error", text: "Please login to book a facility." });
      return;
    }

    const duration = Number(formData.get("duration")) || 1;
    const price = (facility.pricePerHour || 0) * duration;

    const bookingData = {
      facilityId: facility._id,
      facilityName: facility.facilityName,
      sportType: facility.sportType,
      location: facility.location,
      imageUrl: facility.imageUrl || "/images/hero-football.jpg",
      email,
      date: String(formData.get("date") || ""),
      timeSlot: String(formData.get("timeSlot") || ""),
      duration,
      price,
      status: "Confirmed",
    };

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Booking failed");
      }

      setMessage({
        type: "success",
        text: "Booking successfully confirmed!",
      });
      form.reset();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Book This Facility</h2>
        <p className="text-xs text-gray-500 mt-1">
          Fill in your details to reserve this spot
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        <div className="space-y-1.5">
          <label className={labelClass}>FACILITY</label>
          <input
            readOnly
            value={facility.facilityName}
            className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-600`}
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>EMAIL</label>
          <input
            type="email"
            name="email"
            required={!sessionEmail}
            readOnly={Boolean(sessionEmail)}
            defaultValue={sessionEmail}
            placeholder="Enter your email"
            className={`${inputClass} ${
              sessionEmail ? "cursor-not-allowed bg-gray-50 text-gray-600" : ""
            }`}
          />
          {sessionEmail ? (
            <p className="text-[11px] text-gray-400">
              Booked with your account email.
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label className={`${labelClass} flex items-center gap-1.5`}>
            <CalendarDays className="w-3.5 h-3.5" />
            BOOKING DATE
          </label>
          <input
            type="date"
            name="date"
            required
            min={today}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className={`${labelClass} flex items-center gap-1.5`}>
            <Clock className="w-3.5 h-3.5" />
            TIME SLOT
          </label>
          <select
            name="timeSlot"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>DURATION (HOURS)</label>
          <input
            type="number"
            name="duration"
            defaultValue={1}
            min={1}
            max={8}
            required
            className={inputClass}
          />
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span>Price per hour</span>
            <span>৳{facility.pricePerHour}</span>
          </div>
          <p className="text-xs text-gray-500">
            Total is calculated from the duration you select.
          </p>
        </div>

        {message && (
          <p
            className={`text-sm text-center ${
              message.type === "success" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
