"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Building2,
  Plus,
  Home,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const publicLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/facilities", label: "All Facilities", icon: Building2 },
];

const dashboardLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/add-facility",
    label: "Add Facility",
    icon: Plus,
  },
  {
    href: "/dashboard/manage-facilities",
    label: "Manage Facilities",
    icon: Building2,
  },
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: LayoutDashboard,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white shadow-sm">
      <div className="mx-auto flex h-[76px] w-full max-w-[1580px] items-center justify-between gap-4 px-5 sm:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {publicLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[16px] transition-colors",
                  active
                    ? "font-semibold text-[#16a34a]"
                    : "font-medium text-gray-600 hover:text-[#16a34a]",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {user &&
            dashboardLinks.slice(1).map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[16px] transition-colors",
                    active
                      ? "font-semibold text-[#16a34a]"
                      : "font-medium text-gray-600 hover:text-[#16a34a]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center md:flex">
          {isPending ? (
            <div className="size-10 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open user menu"
                    className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#16a34a]"
                  >
                    <Avatar className="size-10 cursor-pointer border border-slate-200">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-[#16a34a] font-semibold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 size-4" />
                      Dashboard
                    </Link>
                  }
                />

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl px-7 font-semibold shadow-none",
              )}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-gray-100 md:hidden"
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {publicLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                    active
                      ? "bg-green-50 font-semibold text-[#16a34a]"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}

            {user && (
              <>
                <div className="my-2 border-t border-gray-100" />

                {dashboardLinks.map((link) => {
                  const active = isActive(link.href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                        active
                          ? "bg-green-50 font-semibold text-[#16a34a]"
                          : "text-gray-600 hover:bg-gray-50",
                      )}
                    >
                      <Icon className="size-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </>
            )}

            <div className="mt-3 border-t border-gray-100 pt-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              ) : user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 shrink-0 border">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-[#16a34a] font-semibold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full rounded-xl font-semibold shadow-none",
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}