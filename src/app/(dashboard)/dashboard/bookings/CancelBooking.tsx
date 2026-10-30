
"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";

interface CancelBookingProps {
  bookingId: string;
  onCancelled: () => void;
}

export default function CancelBooking({
  bookingId,
  onCancelled,
}: CancelBookingProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:8000/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled" }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Cancellation failed");
      }

      onCancelled();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <X size={17} />
        )}
        Cancel
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
