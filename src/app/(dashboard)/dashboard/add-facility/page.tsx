
"use client";

import { useEffect, useState } from "react";
import { Plus, X, MapPin, Image, Trophy, Clock3 } from "lucide-react";
import { toast } from "sonner";

const initialFormData = {
  facilityName: "",
  sportType: "",
  imageUrl: "",
  location: "",
  pricePerHour: "",
  capacity: "",
  description: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

export default function AddFacilityForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [currentSlot, setCurrentSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Previous form data load
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const savedData = localStorage.getItem("facility-form-draft");

        if (savedData) {
          const draft = JSON.parse(savedData);

          setFormData({
            ...initialFormData,
            ...draft.formData,
          });

          setTimeSlots(
            Array.isArray(draft.timeSlots) ? draft.timeSlots : []
          );
        }
      } catch {
        localStorage.removeItem("facility-form-draft");
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Save form data automatically
  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      "facility-form-draft",
      JSON.stringify({ formData, timeSlots })
    );
  }, [formData, timeSlots, ready]);

  // Input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add time slot
  const handleAddSlot = () => {
    const slot = currentSlot.trim();

    if (!slot) {
      toast.error("Please enter a time slot");
      return;
    }

    if (timeSlots.includes(slot)) {
      toast.error("This time slot already exists");
      return;
    }

    setTimeSlots((previous) => [...previous, slot]);
    setCurrentSlot("");
    toast.success("Time slot added");
  };

  // Remove time slot
  const handleRemoveSlot = (slot: string) => {
    setTimeSlots((previous) =>
      previous.filter((item) => item !== slot)
    );
  };

  // Submit form
 
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  console.log("SUBMIT BUTTON CLICKED!");
  toast.success("Submit function is working!");

  // বাকি তোমার existing code থাকবে
  setLoading(true);

  const facilityData = {
    ...formData,
    pricePerHour: Number(formData.pricePerHour),
    capacity: Number(formData.capacity),
    availableTimeSlots: timeSlots,
  };

  try {
    console.log("Sending facility data:", facilityData);

    const res = await fetch("http://localhost:8000/facilities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facilityData),
    });

    const data = await res.json();

    console.log("Server response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to add facility");
    }

    toast.success("Facility added successfully!");

    setFormData(initialFormData);
    setTimeSlots([]);
    setCurrentSlot("");

    localStorage.removeItem("facility-form-draft");
  } catch (error) {
    console.error("Facility error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <Trophy className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add New Facility
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your listing and let players discover your venue.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/40">

          <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />

          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            className="space-y-8 p-6 sm:p-10"
          >
            {/* Basic Information */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your facility details.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Facility Name *
                  </label>

                  <input
                    name="facilityName"
                    value={formData.facilityName}
                    onChange={handleChange}
                    placeholder="Green Turf Football Ground"
                    autoComplete="organization"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sport Type *
                  </label>

                  <select
                    name="sportType"
                    value={formData.sportType}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Choose a sport</option>
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                    <option value="badminton">Badminton</option>
                    <option value="tennis">Tennis</option>
                    <option value="basketball">Basketball</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Location & Image */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Location & Image
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Help players find your venue.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Location *
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Gulshan, Dhaka"
                    autoComplete="street-address"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Image className="h-4 w-4 text-emerald-600" />
                    Image URL *
                  </label>

                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className={inputClass}
                  />
                </div>

                {formData.imageUrl && (
                  <div className="overflow-hidden rounded-xl border bg-gray-50 p-2">
                    <p className="mb-2 text-xs text-gray-500">
                      Image preview
                    </p>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageUrl}
                      alt="Facility preview"
                      className="h-48 w-full rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Pricing */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pricing & Capacity
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Set your hourly rate and player limit.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price Per Hour (৳) *
                  </label>

                  <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    placeholder="500"
                    min="0"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Capacity (Players) *
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="22"
                    min="1"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Time Slots */}
            <section>
              <div className="mb-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Clock3 className="h-5 w-5 text-emerald-600" />
                  Available Time Slots
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the times when your facility is available.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  value={currentSlot}
                  onChange={(e) => setCurrentSlot(e.target.value)}
                  placeholder="08:00 AM - 09:00 AM"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="flex shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-4 text-white transition hover:bg-emerald-600"
                  aria-label="Add time slot"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <span
                    key={slot}
                    className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                  >
                    {slot}

                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(slot)}
                      className="rounded-full p-0.5 text-emerald-700 hover:bg-emerald-200"
                      aria-label={`Remove ${slot}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Description */}
            <section>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Facility Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your facility, available equipment, and amenities..."
                rows={4}
                required
                className={`${inputClass} resize-y`}
              />
            </section>

            {/* Submit */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-400">
                * Required fields
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Adding Facility...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Facility
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Your sports journey starts here · Sports Nest
        </p>
      </div>
    </div>
  );
}
