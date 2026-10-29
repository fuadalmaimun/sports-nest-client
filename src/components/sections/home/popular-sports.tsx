import Link from "next/link";

const sports = [
  {
    name: "Football",
    emoji: "⚽",
    href: "/facilities?category=football",
    className:
      "bg-blue-50 border-blue-100 text-blue-600 hover:border-blue-300 hover:bg-blue-100",
  },
  {
    name: "Badminton",
    emoji: "🏸",
    href: "/facilities?category=badminton",
    className:
      "bg-amber-50 border-amber-100 text-amber-600 hover:border-amber-300 hover:bg-amber-100",
  },
  {
    name: "Tennis",
    emoji: "🎾",
    href: "/facilities?category=tennis",
    className:
      "bg-pink-50 border-pink-100 text-pink-500 hover:border-pink-300 hover:bg-pink-100",
  },
  {
    name: "Swimming",
    emoji: "🏊",
    href: "/facilities?category=swimming",
    className:
      "bg-sky-50 border-sky-100 text-sky-500 hover:border-sky-300 hover:bg-sky-100",
  },
  {
    name: "Basketball",
    emoji: "🏀",
    href: "/facilities?category=basketball",
    className:
      "bg-orange-50 border-orange-100 text-orange-500 hover:border-orange-300 hover:bg-orange-100",
  },
  {
    name: "Cricket",
    emoji: "🏏",
    href: "/facilities?category=cricket",
    className:
      "bg-violet-50 border-violet-100 text-violet-500 hover:border-violet-300 hover:bg-violet-100",
  },
];

export default function PopularSports() {
  return (
    <section className="border-t-2 border-green-600 bg-white py-16 font-[family-name:var(--font-poppins)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Popular Sports
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Find facilities for every sport you love
          </p>
        </div>

        {/* Sport cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sports.map((sport) => (
            <Link
              key={sport.name}
              href={sport.href}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-6 transition-colors ${sport.className}`}
            >
              <span className="text-3xl" aria-hidden="true">
                {sport.emoji}
              </span>
              <span className="text-xs font-semibold">{sport.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
