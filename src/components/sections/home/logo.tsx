import Link from "next/link";
import { cn } from "cn";

function BallIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7.5 16.28 10.61 14.64 15.64 9.36 15.64 7.72 10.61Z" />
      <path d="M12 7.5V2.5M16.28 10.61l4.74-1.55M14.64 15.64l2.95 4.05M9.36 15.64l-2.95 4.05M7.72 10.61l-4.75-1.55" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
      aria-label="SportNest home"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-[#16a34a] text-white shadow-sm shadow-[#16a34a]/30">
        <BallIcon className="size-6" />
      </span>
      <span className="text-[26px] leading-none font-extrabold tracking-tight text-[#111827]">
        Sport<span className="text-[#16a34a]">Nest</span>
      </span>
    </Link>
  );
}
