'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, PlusCircle, Settings, User } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Back to Home", href: "/", icon: Home, section: "main" },
    {
      name: "My Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      section: "management",
    },
    {
      name: "Add Facility",
      href: "/dashboard/add-facility",
      icon: PlusCircle,
      section: "management",
    },
    {
      name: "Manage Facilities",
      href: "/dashboard/manage-facilities",
      icon: Settings,
      section: "management",
    },
  ];

  const mainItems = navItems.filter((item) => item.section === "main");
  const managementItems = navItems.filter(
    (item) => item.section === "management",
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between p-4">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 py-4 mb-4">
          <div className="bg-emerald-500 text-white p-1.5 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Sport<span className="text-emerald-500">Nest</span>
          </span>
        </div>

        {/* Navigation Section: Main */}
        <nav className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}

          {/* Section Divider / Label */}
          <div className="pt-6 pb-2 px-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Management
            </p>
          </div>

          {/* Navigation Section: Management */}
          {managementItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>      
    </aside>
  );
}
