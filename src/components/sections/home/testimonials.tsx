import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "SportNest made booking our weekly matches incredibly easy. The interface is smooth and changes available in real-time!",
    name: "Kafi Ahmed",
    role: "Football Enthusiast",
    initials: "KA",
    avatarClass: "bg-green-600",
  },
  {
    quote:
      "I love how I can filter by sport type and find a facility near me within seconds. No more calling venues manually.",
    name: "Piya Mukta",
    role: "Badminton Player",
    initials: "PM",
    avatarClass: "bg-orange-500",
  },
  {
    quote:
      "As a facility owner, managing bookings through SportNest has never been easier. Highly recommended!",
    name: "Karim Hasan",
    role: "Venue Partner",
    initials: "KH",
    avatarClass: "bg-sky-500",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-green-50 py-16 font-[family-name:var(--font-poppins)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            What Athletes Say
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Trusted by thousands of sports enthusiasts across the country
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-green-100 bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-full text-xs font-bold text-white ${t.avatarClass}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
