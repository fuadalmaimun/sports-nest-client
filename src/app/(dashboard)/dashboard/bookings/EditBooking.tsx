
"use client";

import { useState } from "react";
import { Pencil, Loader2, Save, X } from "lucide-react";

interface Booking {
  _id: string;
  date: string;
  timeSlot: string;
  duration: number;
}

interface EditBookingProps {
  booking: Booking;
  onUpdated: (updatedBooking: Partial<Booking>) => void;
}

export default function EditBooking({
  booking,
  onUpdated,
}: EditBookingProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedData = {
      date: String(formData.get("date")),
      timeSlot: String(formData.get("timeSlot")),
      duration: Number(formData.get("duration")),
    };

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:8000/bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Booking update failed");
      }

      onUpdated(updatedData);
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
      >
        <Pencil size={16} />
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Booking</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={booking.date}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Time Slot
                </label>
                <select
                  name="timeSlot"
                  required
                  defaultValue={booking.timeSlot}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                  <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                  <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  name="duration"
                  min={1}
                  max={8}
                  required
                  defaultValue={booking.duration}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
