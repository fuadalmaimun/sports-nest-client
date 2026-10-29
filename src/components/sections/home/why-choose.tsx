import { CalendarCheck, ShieldCheck, Medal } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description:
      "Reserve your favorite sports facility in seconds with real-time availability and instant confirmation.",
    iconClass: "text-green-600 bg-green-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "JWT-protected payments and data with 99.9% uptime that keeps your reservations safe and worry-free.",
    iconClass: "text-blue-600 bg-blue-100",
  },
  {
    icon: Medal,
    title: "Premium Venues",
    description:
      "Hand-picked, elite, top-quality facilities reviewed and rated by our trusted community.",
    iconClass: "text-orange-500 bg-orange-100",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-16 font-[family-name:var(--font-poppins)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Why Choose SportNest?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Everything you need for a seamless sports booking experience
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center transition-shadow hover:shadow-md"
            >
              <div
                className={`mx-auto flex size-14 items-center justify-center rounded-xl ${feature.iconClass}`}
              >
                <feature.icon className="size-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
