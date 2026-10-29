import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, Star, Trophy } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Facilities" },
  { value: "10K+", label: "Bookings" },
  { value: "6", label: "Sports" },
  { value: "4.9", label: "Rating", star: true },
];

const floatingPillClasses =
  "inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-[15px] font-medium text-white backdrop-blur-md";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image + overlays */}
      <Image
        src="/images/hero-football.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#052e16]/55 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#04210f]/70 via-[#04210f]/25 to-[#04210f]/65"
      />

      {/* Floating badges */}
      <div className="pointer-events-none absolute top-[17%] left-10 hidden xl:block">
        <span className={floatingPillClasses}>
          <span className="size-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
          500+ Active Facilities
        </span>
      </div>
      <div className="pointer-events-none absolute right-10 bottom-[21%] hidden xl:block">
        <span className={floatingPillClasses}>
          <CircleCheck className="size-4.5 text-[#4ade80]" />
          10,000+ Bookings Made
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh_-_76px)] w-full max-w-[1520px] flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-[15px] font-semibold text-white backdrop-blur-md">
          <Trophy className="size-4.5 text-yellow-400" />
          #1 Sports Booking Platform
        </div>

        <h1 className="mt-7 text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight text-white">
          <span className="block">Book Your</span>
          <span className="block text-[#5ee9a0]">Perfect Court</span>
        </h1>

        <p className="mt-7 max-w-3xl text-[17px] leading-relaxed text-white/85 sm:text-[24px]">
          Discover and reserve premium sports facilities — football turfs,
          badminton courts, swimming lanes, and more. Instant booking, zero
          hassle.
        </p>

        <div className="mt-11 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/facilities"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group h-[68px] w-full gap-3 rounded-2xl px-9 text-[18px] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.25)] sm:w-auto"
            )}
          >
            Explore Facilities
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-[68px] w-full items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-9 text-[18px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
          >
            Get Started Free
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl leading-none font-extrabold text-white sm:text-[2.25rem]">
                {stat.value}
                {stat.star && (
                  <Star className="size-6 fill-white text-white sm:size-7" />
                )}
              </div>
              <div className="mt-2 text-[15px] font-medium text-white/65">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
