import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="bg-green-600 py-16 font-[family-name:var(--font-poppins)]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Book Your Next Game?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-green-100">
          Join thousands of sports enthusiasts who trust SportNest for their
          bookings.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/facilities"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-green-700 shadow-sm transition-colors hover:bg-green-50"
          >
            Browse Facilities
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}
