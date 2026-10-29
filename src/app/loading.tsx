
export default function Loading() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white px-4">

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/20 blur-3xl" />

      {/* Animated loader */}
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center">

        {/* Outer ring */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-[3px] border-dashed border-emerald-200" />

        {/* Main spinner */}
        <div className="absolute inset-2 animate-spin rounded-full border-[4px] border-emerald-100 border-t-emerald-500 border-r-emerald-400" />

        {/* Inner circle */}
        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            className="h-8 w-8"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="m12 3 3 5-3 4-5-1-4-3M12 12l4 7M12 12l-7 6" />
          </svg>
        </div>

        {/* Orbiting dot */}
        <div className="absolute right-1 top-3 h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-md shadow-emerald-400/50" />
      </div>

      {/* Text */}
      <div className="relative space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Getting things ready
          <span className="text-emerald-500">.</span>
        </h2>

        <p className="text-sm text-gray-500">
          Preparing your next sports experience
        </p>
      </div>

      {/* Animated dots */}
      <div className="mt-6 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" />
      </div>

      {/* Bottom label */}
      <p className="absolute bottom-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
        Sports Nest
      </p>
    </div>
  );
}
